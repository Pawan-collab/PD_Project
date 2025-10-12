import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Shield, User, Cpu, Sparkles, ArrowLeft, AlertCircle } from "lucide-react";
import { useAdminLogin } from "@/hooks/useAdminLogin";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, isLoading, onSubmit } = useAdminLogin();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/10"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">AI_SOLUTIONS</span>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Admin Control Center
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Manage your AI-powered platform with advanced administrative tools and real-time insights.
            </p>
            
            <div className="flex items-center gap-4 pt-6">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Secure Access</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-white/60 text-sm">
          © 2024 AI-Solutions. All rights reserved.
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-primary">AI_SOLUTIONS</span>
            </div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Enter your credentials to access the admin dashboard</p>
          </div>
          
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="identifier" className="text-sm font-medium">
                    Email or Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="identifier"
                      type="text"
                      placeholder="Enter your email or username"
                      {...register('identifier')}
                      className={`pl-12 h-12 bg-muted/50 border-0 focus:bg-background transition-colors ${
                        errors.identifier ? 'border-2 border-destructive' : ''
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.identifier && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.identifier.message}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register('password')}
                      className={`pl-12 pr-12 h-12 bg-muted/50 border-0 focus:bg-background transition-colors ${
                        errors.password ? 'border-2 border-destructive' : ''
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.password.message}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    {...register('rememberMe')}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                  >
                    Remember me for 7 days
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Access Dashboard
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to main website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}