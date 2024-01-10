import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useState(false);
  // const navigate = useNavigate();
  const handleChange = (e) => {
    // if(e.key=='Enter') console.log('clicked enter')
    // console.log(e.target.value)
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log("data.name : ", data.name);
  }, [data.name]);

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();

      const newData = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("http://localhost:5000/api/auth", newData);
      localStorage.setItem("token", res.data.data);
      window.location = "/game";
      toast.success(res.data.message);
      console.log("Auth : ", res.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
        console.log("Error : ", error.response.data.message);
      }
    }
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      const newData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      const tokenData = {
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("http://localhost:5000/api/users", newData);
      console.log("Users : ", res.message);
      localStorage.setItem("token", res.data);
      window.location = "/game";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
        console.log("Error : ", error.response.data.message);
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
                  onChange={handleChange}
                  value={data.email}
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
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      () => handleClick;
                    }
                  }}
                  value={data.password}
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
                  onChange={handleChange}
                  value={data.name}
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
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Confirm password</Label>
                <Input
                  className='bg-[#2a3042] border-[#2f364a] border-2'
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={data.confirmPassword}
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
