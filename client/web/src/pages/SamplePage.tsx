import React, { useState } from 'react';
import { Button, Input, Textarea, Form } from '../ui/components';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const SamplePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-[var(--text)]">
            Component Showcase
          </h1>
          <p className="text-[var(--text)] opacity-80">
            Explore our UI components in action
          </p>
        </div>

        {/* Button Showcase */}
        <section className="mb-12 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="mt-4">
            <Button fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* Form Showcase */}
        <section className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--text)]">
            Contact Form
          </h2>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              fullWidth
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              fullWidth
            />
            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              fullWidth
            />
            <Button type="submit" fullWidth loading={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Form>
        </section>
      </div>
    </div>
  );
};
