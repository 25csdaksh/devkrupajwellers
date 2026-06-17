import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Contact = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null); // 'success' | 'error' | null
  const [errorMsg, setErrorMsg] = useState('');


  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitSuccess(null);
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'contact_inquiries'), {
        name,
        email,
        phone,
        message,
        createdAt: new Date(),
        status: 'unread'
      });

      const formattedMessage = `Hello Devkrupa Jewellers! I would like to inquire about your jewelry.
Here are my contact details:
• Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Message: ${message}`;
      const url = `https://wa.me/919638748423?text=${encodeURIComponent(formattedMessage)}`;
      setWhatsappUrl(url);
      
      setSubmitSuccess('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error("Error saving inquiry:", error);
      setSubmitSuccess('error');
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">{t('contactUs')}</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            {t('contactDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-effect p-8 rounded-lg border border-white/10">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">{t('getInTouch')}</h3>
              
              <div className="space-y-6">
                <a 
                  href="https://www.google.com/maps/place/DEVKRUPA+JEWELLERS/@23.0264246,72.6103282,801m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e858a97eb4da9:0x25f37a7e37301c0d!8m2!3d23.0264246!4d72.6129031!16s%2Fg%2F11ry4t3jy6?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 hover:text-accent transition-colors group"
                >
                  <div className="bg-secondary p-3 rounded-full text-accent mt-1 group-hover:bg-accent group-hover:text-dominant transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-primary group-hover:text-accent transition-colors">{t('ourShowroom')}</h4>
                    <p className="text-muted leading-relaxed group-hover:text-accent transition-colors">
                      near ramdev masala, opp. vikram mill,<br />
                      saraspur, Ahmedabad, Gujarat
                    </p>
                  </div>
                </a>

                <a 
                  href="tel:+919638748423"
                  className="flex items-start gap-4 hover:text-accent transition-colors group"
                >
                  <div className="bg-secondary p-3 rounded-full text-accent mt-1 group-hover:bg-accent group-hover:text-dominant transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-primary group-hover:text-accent transition-colors">{t('phone')}</h4>
                    <p className="text-muted group-hover:text-accent transition-colors">+91 96387 48423</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-full text-accent mt-1">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-primary">{t('email')}</h4>
                    <p className="text-muted">info@devkrupajewellers.com</p>
                    <p className="text-muted">support@devkrupajewellers.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-serif font-semibold mb-4 text-primary">{t('businessHours')}</h3>
              <ul className="space-y-2 text-muted">
                <li className="flex justify-between"><span>{t('monSat')}</span> <span>10:30 AM - 8:30 PM</span></li>
                <li className="flex justify-between"><span>{t('sunday')}</span> <span>11:00 AM - 6:00 PM</span></li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-lg border border-white/10">
            {submitSuccess === 'success' ? (
              <div className="text-center py-8 space-y-6">
                <div className="bg-[#25D366]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-[#25D366]/30 text-[#25D366] animate-pulse">
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h4 className="text-2xl font-serif font-bold text-primary mb-2">Inquiry Submitted!</h4>
                  <p className="text-muted text-sm max-w-sm mx-auto">
                    Your inquiry has been successfully saved in our database. You can also chat with us directly on WhatsApp with your inquiry.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3.5 px-6 rounded transition-colors flex justify-center items-center gap-2 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 text-sm"
                    >
                      <MessageCircle size={18} /> Continue to WhatsApp Chat
                    </a>
                  )}
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="w-full bg-white/5 hover:bg-white/10 text-primary border border-white/10 font-semibold py-3 rounded transition-colors text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif font-semibold mb-6 text-primary">{t('sendMsg')}</h3>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {submitSuccess === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded text-xs flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">{t('fullName')}</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dominant border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/40"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">{t('emailAddress')}</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-dominant border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/40"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">{t('phoneNumber')}</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-dominant border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/40"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">{t('message')}</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-dominant border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors resize-none placeholder-white/40"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-accent hover:bg-yellow-500 disabled:opacity-50 text-dominant font-semibold py-4 rounded transition-colors flex justify-center items-center gap-2 shadow-lg shadow-accent/15"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin animate-duration-1000" size={18} />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        {t('sendInquiry')} <MessageCircle size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>


        </div>
        {/* Map Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-serif font-semibold mb-6 text-center lg:text-left text-primary">Find Our Showroom</h3>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9772186711585!2d72.61032821102927!3d23.026424579177114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e858a97eb4da9%3A0x25f37a7e37301c0d!2sDEVKRUPA%20JEWELLERS!5e0!3m2!1sen!2sin!4v1780387356263!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Devkrupa Jewellers Location"
              className="w-full h-[350px] md:h-[450px] grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Contact;