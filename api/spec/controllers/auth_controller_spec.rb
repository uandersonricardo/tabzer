require "rails_helper"

describe AuthController do
  let(:user) { create(:user, password: "123456") }

  describe "POST /signin" do
    context "when valid credentials" do
      let(:valid_credentials) { { username: user.username, password: "123456" } }

      before { post :login, params: valid_credentials }

      it { is_expected.to respond_with 200 }

      it "returns an authentication token" do
        expect(JSON.parse(response.body)["token"]).not_to be_nil
      end

      it "returns an user" do
        expect(JSON.parse(response.body)["user"]).not_to be_nil
      end

      it "returns the correct user" do
        expect(JSON.parse(response.body)["user"]["username"]).to eq(user.username)
      end

      it "returns an expiration date" do
        expect(JSON.parse(response.body)["exp"]).not_to be_nil
      end
    end

    context "when invalid credentials" do
      let(:invalid_credentials) { { username: user.username, password: "invalid_password" } }

      before { post :login, params: invalid_credentials }

      it { is_expected.to respond_with 401 }

      it "returns a failure message" do
        expect(response.body).to match(/invalid/)
      end
    end
  end

  describe "GET /me" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { get :me }

      it { is_expected.to respond_with 200 }

      it "returns an user" do
        expect(response.body).not_to be_nil
      end

      it "returns the correct user" do
        expect(JSON.parse(response.body)["username"]).to eq(user.username)
      end
    end

    context "when not authenticated" do
      before { get :me }

      it { is_expected.to respond_with 401 }

      it "returns a failure message" do
        expect(response.body).to match(/Nil/)
      end
    end
  end
end
