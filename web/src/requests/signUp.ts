import api from "../services/api";

export interface SignUpRequestBody {
  username: string;
  email: string;
  name: string;
  password: string;
  bio?: string;
}

const signUpRequest = async (body: SignUpRequestBody) => {
  return await api.post("/users", body);
};

export default signUpRequest;
