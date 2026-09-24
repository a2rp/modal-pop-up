import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import Modal from "./modal";
import {
    FiArrowUpRight,
    FiCheckCircle,
    FiCode,
    FiCoffee,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLinkedin,
    FiMail,
    FiMenu,
    FiMessageSquare,
    FiSend,
    FiStar,
    FiX,
    FiYoutube,
} from "react-icons/fi";

const socialLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FiCode },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FiLinkedin },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FiFacebook },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FiYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
];

const supportLinks = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FiHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FiCoffee },
    { label: "Patreon", href: "https://patreon.com/a2rp", icon: FiStar },
];

const ModalComp = () => {
    const [inputValue, setInputValue] = useState("");
    const [displayModal, setDisplayModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const publicUrl = process.env.PUBLIC_URL || "";

    useEffect(() => {
        const closeMenu = () => setMenuOpen(false);
        window.addEventListener("resize", closeMenu);
        return () => window.removeEventListener("resize", closeMenu);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) {
            toast.error("Write something before opening the modal.");
            return;
        }
        setDisplayModal(true);
        setMenuOpen(false);
    };

    const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <a className={styles.brand} href="#home" onClick={() => setMenuOpen(false)}>
                    <img src={`${publicUrl}/logo.png`} alt="Ashish Ranjan logo" />
                    <span><small>A2RP COMPONENTS</small><strong>Modal Pop-up</strong></span>
                </a>
                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Main navigation">
                    <a href="#home" onClick={() => setMenuOpen(false)}>Overview</a>
                    <a href="#interaction" onClick={() => setMenuOpen(false)}>Interaction</a>
                    <a href="#footer" onClick={() => setMenuOpen(false)}>Links</a>
                </nav>
                <button className={styles.menuButton} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </header>

            <main id="home" className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.eyebrow}>REUSABLE REACT PATTERN</span>
                        <h1>Open a focused modal with confidence.</h1>
                        <p>Type a short message and preview a clean modal component with validation, keyboard support and a clear close path.</p>
                        <div className={styles.heroActions}>
                            <a className={styles.secondaryLink} href="#interaction">See how it works <FiArrowUpRight /></a>
                            <span className={styles.status}><FiCheckCircle /> Ready to use</span>
                        </div>
                    </div>
                    <div className={styles.visualCard} style={{ backgroundImage: `url(${publicUrl}/modal-background.jpg)` }} aria-label="Abstract modal interface background">
                        <div className={styles.visualBadge}><FiMessageSquare /><span>Modal component<br /><small>Focused interaction</small></span></div>
                        <div className={styles.visualNote}><FiSend /><span>Clear intent</span></div>
                    </div>
                </section>

                <section id="interaction" className={styles.demoSection}>
                    <div className={styles.sectionHeading}>
                        <span className={styles.eyebrow}>TRY THE DEMO</span>
                        <h2>Turn a message into a modal.</h2>
                        <p>The form keeps its state, validates the input and presents the submitted value in a reusable dialog.</p>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.formCard} noValidate>
                        <div className={styles.formIcon}><FiMessageSquare /></div>
                        <div className={styles.formCopy}><label htmlFor="modalMessage">Your message</label><span>Anything short and useful.</span></div>
                        <input id="modalMessage" value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="Write here something" aria-describedby="messageHint" />
                        <button type="submit" className={styles.submitButton}>Open modal <FiArrowUpRight /></button>
                        <small id="messageHint">A blank message will show a helpful validation toast.</small>
                    </form>
                </section>

                <section className={styles.featureGrid} aria-label="Component features">
                    <article><FiCheckCircle /><h3>Focused controls</h3><p>Clear labels and visible feedback keep the interaction easy to understand.</p></article>
                    <article><FiMessageSquare /><h3>Reusable structure</h3><p>Pass the submitted value into a standalone modal component and close it from one place.</p></article>
                    <article><FiSend /><h3>Responsive by default</h3><p>The layout adapts from wide screens to compact mobile displays without losing the flow.</p></article>
                </section>
            </main>

            <footer id="footer" className={styles.footer}>
                <div className={styles.footerIntro}><span className={styles.eyebrow}>KEEP EXPLORING</span><h2>Simple components, thoughtful details.</h2></div>
                <div className={styles.footerGroups}>
                    <div><span className={styles.footerLabel}>Links</span><div className={styles.footerLinks}>{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} title={label}><Icon /></a>)}</div></div>
                    <div><span className={styles.footerLabel}>Support</span><div className={styles.footerLinks}>{supportLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon /></a>)}</div></div>
                </div>
                <div className={styles.footerBottom}><span>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></span><span>Built for learning and reuse.</span></div>
            </footer>

            <button className={styles.goTop} type="button" onClick={goToTop} aria-label="Go to top"><FiArrowUpRight /></button>
            {displayModal && <Modal inputValue={inputValue} onClose={() => setDisplayModal(false)} />}
        </div>
    );
};

export default ModalComp;