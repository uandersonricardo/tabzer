require "rails_helper"

describe "JsonWebToken" do
  describe ".encode" do
    context "when payload is valid" do
      let(:payload) { { user_id: 1 } }

      it "returns a valid token" do
        token = JsonWebToken.encode(payload)
        expect(token).to be_a(String)
      end
    end

    context "when payload is invalid" do
      let(:payload) { nil }

      it "raises an error" do
        expect { JsonWebToken.encode(payload) }.to raise_error(ArgumentError)
      end
    end
  end

  describe ".decode" do
    context "when token is valid" do
      let(:payload) { { user_id: 1 } }
      let(:token) { JsonWebToken.encode(payload) }

      it "returns a valid payload" do
        decoded_payload = JsonWebToken.decode(token)
        expect(decoded_payload).to have_key(:user_id)
        expect(decoded_payload[:user_id]).to eq(1)
      end
    end

    context "when token is invalid" do
      let(:token) { nil }

      it "raises an error" do
        expect { JsonWebToken.decode(token) }.to raise_error(JWT::DecodeError)
      end
    end
  end
end
