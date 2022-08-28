import api from "../services/api";

export interface SignInRequestBody {
  username: string;
  password: string;
}

const signInRequest = async (body: SignInRequestBody) => {
  return await api.post("/signin", body);
};

export default signInRequest;
