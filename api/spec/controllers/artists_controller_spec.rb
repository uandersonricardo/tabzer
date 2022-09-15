require "rails_helper"

describe ArtistsController do
  let(:user) { create(:user) }

  describe "GET /artists" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { create(:artist, name: "Artist 1") }

      before { get :index }

      it { is_expected.to respond_with 200 }

      it "returns an array of artists" do
        expect(response.body).not_to be_nil
      end

      it "returns the correct number of artists" do
        expect(JSON.parse(response.body).size).to eq(1)
      end

      it "returns the correct artists" do
        expect(JSON.parse(response.body)[0]["name"]).to eq("Artist 1")
      end
    end

    context "when not authenticated" do
      before { get :index }

      it { is_expected.to respond_with 401 }
    end
  end

  describe "GET /artists/:id" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { create(:artist, name: "Artist 1") }

      before { get :show, params: { id: Artist.first.id } }

      it { is_expected.to respond_with 200 }

      it "returns an artist" do
        expect(response.body).not_to be_nil
      end

      it "returns the correct artist" do
        expect(JSON.parse(response.body)["name"]).to eq("Artist 1")
      end
    end

    context "when not authenticated" do
      before { get :show, params: { id: "00000000-0000-0000-0000-000000000000" } }

      it { is_expected.to respond_with 401 }
    end
  end

  describe "POST /artists" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      context "when valid params" do
        let(:valid_params) { { name: "Artist 1" } }

        before { post :create, params: valid_params }

        it { is_expected.to respond_with 201 }

        it "returns an artist" do
          expect(response.body).not_to be_nil
        end

        it "returns the correct artist" do
          expect(JSON.parse(response.body)["name"]).to eq("Artist 1")
        end
      end

      context "when invalid params" do
        let(:invalid_params) { { name: "" } }

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end
    end

    context "when not authenticated" do
      before { post :create, params: { name: "Artist 1" } }

      it { is_expected.to respond_with 401 }
    end
  end

  describe "PUT /artists/:id" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { create(:artist, name: "Artist 1") }

      context "when valid params" do
        let(:valid_params) { { name: "Artist 2" } }

        before { put :update, params: valid_params.merge(id: Artist.first.id) }

        it { is_expected.to respond_with 204 }
      end

      context "when invalid params" do
        let(:invalid_params) { { name: "" } }

        before { put :update, params: invalid_params.merge(id: Artist.first.id) }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end
    end

    context "when not authenticated" do
      before do
        put :update, params: { name: "Artist 2", id: "00000000-0000-0000-0000-000000000000" }
      end

      it { is_expected.to respond_with 401 }
    end
  end

  describe "DELETE /artists/:id" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { create(:artist, name: "Artist 1") }

      before { delete :destroy, params: { id: Artist.first.id } }

      it { is_expected.to respond_with 204 }

      it "deletes the artist" do
        expect(Artist.count).to eq(0)
      end
    end

    context "when not authenticated" do
      before { delete :destroy, params: { id: "00000000-0000-0000-0000-000000000000" } }

      it { is_expected.to respond_with 401 }
    end
  end
end
