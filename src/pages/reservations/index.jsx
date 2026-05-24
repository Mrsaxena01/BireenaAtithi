import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  date: yup.string().required('Please select a date'),
  time: yup.string().required('Please select a time'),
  guests: yup.number().min(1).max(20).required('Number of guests is required'),
  specialRequests: yup.string(),
});

export const ReservationsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(
        'Reservation request sent successfully! We will contact you shortly.'
      );
      reset();
    } catch (error) {
      toast.error('Failed to send reservation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-5" />
      {/* Radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent)]" />
      {/* Decorative gradients */}
      <div className="absolute right-0 top-1/4 h-96 w-96 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-[100px] rounded-full" />
      <div className="absolute left-0 bottom-1/4 h-96 w-96 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-[100px] rounded-full" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-3xl font-bold text-slate-100 md:text-4xl lg:text-5xl">
              Make a <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">Reservation</span>
            </h1>
            <p className="text-lg text-slate-400">
              Book your table at BIREENA{' '}
              <span className="font-devanagari bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">अतिथि</span> and experience our
              exceptional cuisine and ambiance.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl bg-slate-900/50 p-8 ring-1 ring-slate-700/50 shadow-xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="border-slate-700 bg-slate-800/50 text-slate-200 placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="border-slate-700 bg-slate-800/50 text-slate-200 placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
              </div>
              <div>
                <label
                  htmlFor="guests"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="20"
                    placeholder="4"
                    className="pl-10 border-slate-700 bg-slate-800/50 text-slate-200 placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                    {...register('guests')}
                    error={errors.guests?.message}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10 border-slate-700 bg-slate-800/50 text-slate-200 placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('date')}
                    error={errors.date?.message}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="time"
                    type="time"
                    className="pl-10"
                    {...register('time')}
                    error={errors.time?.message}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Special Requests
              </label>
              <textarea
                id="specialRequests"
                rows={4}
                className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-slate-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500 focus:ring-1 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                placeholder="Any dietary restrictions or special requests?"
                {...register('specialRequests')}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-slate-950 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600" 
              loading={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Request Reservation'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
