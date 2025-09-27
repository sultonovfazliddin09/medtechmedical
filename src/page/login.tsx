import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Link,
  Box,
} from "@mui/material";
import { motion } from "framer-motion"; // framer-motion kutubxonasini o‘rnat: npm i framer-motion
import { useAuth } from "../../store/auth.store";
import { api } from "../service/api"
import { rolePath } from "../routes/role-path";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const { data } = await api.post("/auth/login", { email, password });
    login(data.access_token, data.user);

    nav(rolePath[data.user.role as keyof typeof rolePath], { replace: true });
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 400 }}
      >
        <Card
          sx={{
            width: "100%",
            boxShadow: 6,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                component="div"
                textAlign="center"
                fontWeight="bold"
              >
                Login to your account
              </Typography>
            }
            sx={{ backgroundColor: "#f5f5f5" }}
          />
          <CardContent>
            <form onSubmit={onSubmit}>
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <Link
                href="#"
                underline="hover"
                variant="body2"
                sx={{ display: "block", textAlign: "right", mt: 1 }}
              >
                Forgot your password?
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
                >
                  Login
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
