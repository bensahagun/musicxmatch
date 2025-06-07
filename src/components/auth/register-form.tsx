"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    country: z.string().min(1, "Please select a country"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      country: "US",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          country: data.country,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      if (result.user) {
        setUser(result.user);
        router.push("/dashboard");
      } else {
        setSuccess("Registration successful! Please check your email to verify your account.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            {...register("email")}
            type='email'
            id='email'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your email'
          />
          {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            {...register("password")}
            type='password'
            id='password'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Enter your password'
          />
          {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            type='password'
            id='confirmPassword'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            placeholder='Confirm your password'
          />
          {errors.confirmPassword && <p className='mt-1 text-sm text-red-600'>{errors.confirmPassword.message}</p>}
        </div>

        <div>
          <label htmlFor='country' className='block text-sm font-medium text-gray-700'>
            Country
          </label>
          <select
            {...register("country")}
            id='country'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Select your country</option>
            <option value='US'>United States</option>
            <option value='GB'>United Kingdom</option>
            <option value='CA'>Canada</option>
            <option value='AU'>Australia</option>
            <option value='DE'>Germany</option>
            <option value='FR'>France</option>
            <option value='IT'>Italy</option>
            <option value='ES'>Spain</option>
            <option value='BR'>Brazil</option>
            <option value='JP'>Japan</option>
            <option value='IN'>India</option>
            <option value='CN'>China</option>
            <option value='MX'>Mexico</option>
            <option value='AR'>Argentina</option>
            <option value='CO'>Colombia</option>
            <option value='PH'>Philippines</option>
            <option value='ZA'>South Africa</option>
            <option value='ZA'>South Africa</option>
          </select>
          {errors.country && <p className='mt-1 text-sm text-red-600'>{errors.country.message}</p>}
        </div>

        {error && <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>{error}</div>}

        {success && (
          <div className='p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md'>{success}</div>
        )}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
