import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const valid = /^\S+@\S+\.\S+$/.test(email);

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    // Frontend only: connect this to Mailchimp, Klaviyo, Formspree etc. when ready.
    setDone(true);
  };

  return (
    <section className="newsletter">
      <div className="eyebrow eyebrow--light">THE LIST</div>
      <h2 className="display">
        Get the next drop <em>first.</em>
      </h2>
      <p>Early access before every release. Small drops, no noise.</p>
      {done ? (
        <p role="status" className="newsletter__done">You are on the list. Watch your inbox.</p>
      ) : (
        <form onSubmit={submit} noValidate className="newsletter__form">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input id="nl-email" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          <button type="submit" disabled={!valid}>JOIN THE LIST</button>
        </form>
      )}
      <span className="newsletter__small">By subscribing you agree to the [PRIVACY POLICY].</span>
    </section>
  );
}
