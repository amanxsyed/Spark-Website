'use client';

import { useState } from 'react';

type Errors = Partial<Record<'name' | 'email' | 'phone', string>>;

export function RegisterForm() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', interest: 'Pre-construction' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = () => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Enter the name the file should be under.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = 'That email address is missing something.';
    if (values.phone.replace(/\D/g, '').length < 10)
      next.phone = 'A 10-digit number, so an advisor can reach you.';
    setErrors(next);
    if (Object.keys(next).length) return;

    // No backend yet. Point this at GoHighLevel, Formspree, or a Next.js
    // route handler when the CRM is ready.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-done">
        <h3>You are on the list, {values.name.split(' ')[0]}.</h3>
        <p className="form-note">
          An advisor will call {values.phone} within one business day with the
          launches that match what you are looking for. Nothing is committed
          and nothing is charged.
        </p>
      </div>
    );
  }

  return (
    <div className="closer-form">
      <div className="closer-grid">
        <div className="field">
          <label htmlFor="reg-name">Full name</label>
          <input id="reg-name" value={values.name} onChange={set('name')} autoComplete="name" />
          {errors.name ? <p className="field-error">{errors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="reg-phone">Phone</label>
          <input id="reg-phone" value={values.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
          {errors.phone ? <p className="field-error">{errors.phone}</p> : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="reg-email">Email</label>
        <input id="reg-email" value={values.email} onChange={set('email')} inputMode="email" autoComplete="email" />
        {errors.email ? <p className="field-error">{errors.email}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="reg-interest">What are you looking at?</label>
        <select id="reg-interest" value={values.interest} onChange={set('interest')}>
          <option>Pre-construction</option>
          <option>Resale home or condo</option>
          <option>Selling a property</option>
          <option>Investment portfolio</option>
        </select>
      </div>

      <button type="button" className="btn btn--spark" onClick={submit}>
        Join the platinum list
      </button>

      <p className="form-note">
        One list, no drip campaign. You get launch dates, allocation windows and
        price lists — and you can leave in one click.
      </p>
    </div>
  );
}
