import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import axios from "axios";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    const data = {
      email,
      password,
    };

    setLoading(true);

    axios
      .post("http://localhost:8005/users", data)
      .then((response) => {
        setLoading(false);

        if (response.status === 200) {
          console.log("User registered successfully");
          message.success("Registration successful");
          navigate("/login");
        } else {
          console.error("Registration failed with status:", response.status);
          message.error("Registration failed");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error during registration:", error);
        message.error("Error during registration");
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(https://blogs.cdc.gov/publichealthmatters/wp-content/uploads/sites/6/2020/05/golden_retiver_cat_cropped.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100%",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mr: 5,
            ml: 5,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up with Care Master
          </Typography>
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={handleRegister}
          >
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input
                value={email}
                type="text"
                style={{ marginBottom: "16px" }}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input.Password
                value={password}
                style={{ marginBottom: "16px" }}
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="cpassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>

            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUpPage