require "rails_helper"

describe JsonWebToken do
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

      it "has an user_id key" do
        decoded = JsonWebToken.decode(token)
        expect(decoded).to have_key(:user_id)
      end

      it "has a valid user_id" do
        user_id = JsonWebToken.decode(token)[:user_id]
        expect(user_id).to eq(1)
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
