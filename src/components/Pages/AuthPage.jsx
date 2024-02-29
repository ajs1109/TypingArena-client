import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import axios from "axios";
import toast from "react-hot-toast";

const AuthPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });

  const [user, setUser] = useState(false);

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();

      const newData = {
        email: signInData.email,
        password: signInData.password,
      };
      const res = await axios.post("http://localhost:6010/api/auth", newData);
      localStorage.setItem("token", res.data.data);
      window.location = "/game";
      toast.success(res.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      const newData = {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        confirmPassword: signUpData.confirmPassword,
      };
      const res = await axios.post("http://localhost:6010/api/users", newData);
      console.log(res)
      localStorage.setItem("token", res.data.data);
      console.log(res)
      window.location = "/game";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-[#222736] w-[100vw] h-[100vh] text-[#eef1f3]">
      <Tabs defaultValue="SignUp" className="w-[400px] pt-12 h-full mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Login" onClick={() => setUser(true)}>
            Log In
          </TabsTrigger>
          <TabsTrigger value="SignUp" onClick={() => setUser(false)}>
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Card className='bg-[#2a3042] text-[#eef1f3] border-0'>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>Login here to play</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  id="name"
                  type="email"
                  name="email"
                  onChange={handleSignInChange}
                  value={signInData.email}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  id="username"
                  type="password"
                  name="password"
                  onChange={handleSignInChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      () => handleClick;
                    }
                  }}
                  value={signInData.password}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignIn} className='bg-[#556ee6] '>Play</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="SignUp">
          <Card className='bg-[#2a3042] text-[#eef1f3] border-0'>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription className='text-[#eef1f3]'>Create a new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Name</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  id="current"
                  type="name"
                  name="name"
                  onChange={handleSignUpChange}
                  value={signUpData.name}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  id="current"
                  type="email"
                  name="email"
                  onChange={handleSignUpChange}
                  value={signUpData.email}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  type="password"
                  name="password"
                  onChange={handleSignUpChange}
                  value={signUpData.password}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Confirm password</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  type="password"
                  name="confirmPassword"
                  onChange={handleSignUpChange}
                  value={signUpData.confirmPassword}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignUp} className='bg-[#556ee6]'>Play</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
