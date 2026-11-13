import { useState } from 'react';

// Set to your signup endpoint (Formspree, Brevo, Mailchimp form action...). Until it is set,
// the form shows a clear "opens at launch" message instead of pretending to save the email.
const NEWSLETTER_ENDPOINT = '';
const PRIVACY_URL = '';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const valid = /^\S+@\S+\.\S+$/.test(email);

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || !NEWSLETTER_ENDPOINT) return;
    setState('sending');
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="newsletter">
      <div className="eyebrow eyebrow--light">THE LIST</div>
      <h2 className="display">
        Get the next drop <em>first.</em>
      </h2>
      <p>Early access before every release. Small drops, no noise.</p>
      {state === 'done' ? (
        <p role="status" className="newsletter__done">You are on the list. Watch your inbox.</p>
      ) : NEWSLETTER_ENDPOINT ? (
        <form onSubmit={submit} noValidate className="newsletter__form">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input id="nl-email" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <button type="submit" disabled={!valid || state === 'sending'}>{state === 'sending' ? 'Joining…' : 'Join the list'}</button>
          {state === 'error' && <p role="alert" className="newsletter__error">Something went wrong. Please try again.</p>}
        </form>
      ) : (
        <p className="newsletter__soon">Sign-up opens with the first drop.</p>
      )}
      {NEWSLETTER_ENDPOINT && PRIVACY_URL && (
        <span className="newsletter__small">
          By subscribing you agree to our <a href={PRIVACY_URL}>privacy policy</a>.
        </span>
      )}
    </section>
  );
}
