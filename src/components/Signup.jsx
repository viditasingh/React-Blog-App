import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router'
import { login as storeLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const create = async (data) => {
        try {
            setError("")
            setIsLoading(true)
            const userData = await authService.signup(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(storeLogin(currentUser))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Watch password field for confirmation validation
    const password = watch("password", "")

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <Logo size="large" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Join us and start sharing your stories
                    </p>
                </div>

                {/* Signup Form */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        {/* Full Name Field */}
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            type="text"
                            error={errors.name?.message}
                            leftIcon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                            {...register("name", {
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />

                        {/* Email Field */}
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            error={errors.email?.message}
                            leftIcon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            }
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />

                        {/* Password Field */}
                        <Input
                            label="Password"
                            placeholder="Create a password"
                            type="password"
                            error={errors.password?.message}
                            helperText="Must be at least 8 characters with letters and numbers"
                            leftIcon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                validate: {
                                    matchPattern: (value)=> /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || "password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number and can contain special characters"
                                }
                            })}
                        />

                        {/* Confirm Password Field */}
                        <Input
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            type="password"
                            error={errors.confirmPassword?.message}
                            leftIcon={
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value =>
                                    value === password || "Passwords do not match"
                            })}
                        />

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    {...register("terms", {
                                        required: "You must accept the terms and conditions"
                                    })}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-gray-700">
                                    I agree to the{' '}
                                    <Link
                                        to="/terms"
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Terms and Conditions
                                    </Link>
                                    {' '}and{' '}
                                    <Link
                                        to="/privacy"
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                                {errors.terms && (
                                    <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Signup Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>
                    </div>

                </div>

                {/* Login Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                    {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Signup