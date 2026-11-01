/**
 * Devkrupa Jewellers - Diwali Campaign Automation Engine
 * Handles date validation, timezone calculation (Asia/Kolkata),
 * campaign status determination, and verified WhatsApp inquiry generation.
 */

import { useState, useEffect } from 'react';

/**
 * Parses date string or timestamp in context of Asia/Kolkata
 */
export const parseKolkataDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr);
};

/**
 * Determines current campaign status
 * @param {string} startDateStr - ISO start string
 * @param {string} endDateStr - ISO end string
 * @param {boolean} isExplicitlyActive - Manual kill-switch boolean
 * @returns {'upcoming' | 'active' | 'expired'}
 */
export const getCampaignStatus = (startDateStr, endDateStr, isExplicitlyActive = true) => {
  if (!isExplicitlyActive) return 'expired';

  const now = new Date();
  const start = parseKolkataDate(startDateStr);
  const end = parseKolkataDate(endDateStr);

  if (!start || !end || isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'expired';
  }

  if (now < start) {
    return 'upcoming';
  } else if (now > end) {
    return 'expired';
  } else {
    return 'active';
  }
};

/**
 * Calculates time remaining until target date
 */
export const calculateTimeRemaining = (targetDateStr) => {
  const target = parseKolkataDate(targetDateStr);
  if (!target || isNaN(target.getTime())) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { total: diff, days, hours, minutes, seconds, isPast: false };
};

/**
 * React Hook for real-time live countdown timer
 */
export const useCampaignCountdown = (startDateStr, endDateStr, isActive = true) => {
  const [status, setStatus] = useState(() => getCampaignStatus(startDateStr, endDateStr, isActive));
  const [timeLeft, setTimeLeft] = useState(() => {
    const currentStatus = getCampaignStatus(startDateStr, endDateStr, isActive);
    const targetDate = currentStatus === 'upcoming' ? startDateStr : endDateStr;
    return calculateTimeRemaining(targetDate);
  });

  useEffect(() => {
    const updateCountdown = () => {
      const currentStatus = getCampaignStatus(startDateStr, endDateStr, isActive);
      setStatus(currentStatus);
      const targetDate = currentStatus === 'upcoming' ? startDateStr : endDateStr;
      setTimeLeft(calculateTimeRemaining(targetDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startDateStr, endDateStr, isActive]);

  return { status, timeLeft };
};

/**
 * Builds contextually pre-filled, URI-encoded WhatsApp link
 * @param {string} phone - Verified phone digits (e.g. '919638748423')
 * @param {string} customMessage - Plain text inquiry message
 * @returns {string} Fully encoded wa.me URL
 */
export const buildWhatsAppUrl = (phone, customMessage) => {
  const cleanPhone = (phone || '919638748423').replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(customMessage || 'Hello Devkrupa Jewellers, I would like to inquire about your Diwali 2026 Collection.');
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

/**
 * Formats a date nicely for Indian audience (e.g. "15 November 2026")
 */
export const formatFestiveDate = (dateStr) => {
  const date = parseKolkataDate(dateStr);
  if (!date || isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

