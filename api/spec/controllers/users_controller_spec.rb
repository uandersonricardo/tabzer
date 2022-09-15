require "rails_helper"

describe UsersController do
  let!(:user) { create(:user, username: "user-1", email: "user1@email.com") }

  describe "GET /users" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { get :index }

      it { is_expected.to respond_with 200 }

      it "returns an array of users" do
        expect(response.body).not_to be_nil
      end

      it "returns the correct number of users" do
        expect(JSON.parse(response.body).size).to eq(1)
      end

      it "returns the correct users" do
        expect(JSON.parse(response.body)[0]["username"]).to eq("user-1")
      end
    end

    context "when not authenticated" do
      before { get :index }

      it { is_expected.to respond_with 401 }
    end
  end

  describe "GET /users/:id" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { get :show, params: { id: user.id } }

      it { is_expected.to respond_with 200 }

      it "returns an user" do
        expect(response.body).not_to be_nil
      end

      it "returns the correct user" do
        expect(JSON.parse(response.body)["username"]).to eq("user-1")
      end
    end

    context "when not authenticated" do
      before { get :show, params: { id: "00000000-0000-0000-0000-000000000000" } }

      it { is_expected.to respond_with 401 }
    end
  end

  describe "POST /users" do
    context "when valid params" do
      let(:valid_params) do
        { username: "user-2", name: "User 2", email: "user2@email.com", password: "123456",
          bio: "my bio" }
      end

      before { post :create, params: valid_params }

      it { is_expected.to respond_with 201 }

      it "returns an user" do
        expect(response.body).not_to be_nil
      end

      it "returns the correct user" do
        expect(JSON.parse(response.body)["username"]).to eq("user-2")
      end
    end

    context "when invalid params" do
      context "with nil username" do
        let(:invalid_params) do
          { name: "User 2", email: "user2@email.com", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with empty username" do
        let(:invalid_params) do
          { username: "", name: "User 2", email: "user2@email.com", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with used username" do
        let(:invalid_params) do
          { username: "user-1", name: "User 2", email: "user2@email.com", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/already been taken/)
        end
      end

      context "with nil email" do
        let(:invalid_params) do
          { username: "user-2", name: "User 2", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with empty email" do
        let(:invalid_params) do
          { username: "user-2", name: "User 2", email: "", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with used email" do
        let(:invalid_params) do
          { username: "user-2", name: "User 2", email: "user1@email.com", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/already been taken/)
        end
      end

      context "with nil password" do
        let(:invalid_params) do
          { username: "user-2", name: "User 2", email: "user2@email.com",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with empty password" do
        let(:invalid_params) do
          { username: "user-2", name: "User 2", email: "user2@email.com", password: "",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with short password" do
        let(:invalid_params) do
          { username: "user-2", name: "User 2", email: "user2@email.com", password: "12345",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/too short/)
        end
      end

      context "with nil name" do
        let(:invalid_params) do
          { username: "user-2", email: "user2@email.com", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end

      context "with empty name" do
        let(:invalid_params) do
          { username: "user-2", name: "", email: "user2@email.com", password: "123456",
            bio: "my bio" }
        end

        before { post :create, params: invalid_params }

        it { is_expected.to respond_with 422 }

        it "returns a failure message" do
          expect(response.body).to match(/can't be blank/)
        end
      end
    end
  end

  describe "PUT /users/:id" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { create(:user, username: "user-taken", email: "usertaken@email.com") }

      context "when valid params" do
        let(:valid_params) do
          { id: user.id, username: "user-2", name: "User 2", email: "user2@email.com",
            password: "123456", bio: "my bio" }
        end

        before { put :update, params: valid_params }

        it { is_expected.to respond_with 204 }
      end

      context "when invalid params" do
        context "with empty username" do
          let(:invalid_params) do
            { username: "" }
          end

          before { put :update, params: invalid_params.merge(id: User.first.id) }

          it { is_expected.to respond_with 422 }

          it "returns a failure message" do
            expect(response.body).to match(/can't be blank/)
          end
        end

        context "with used username" do
          let(:invalid_params) do
            { username: "user-taken" }
          end

          before { put :update, params: invalid_params.merge(id: User.first.id) }

          it { is_expected.to respond_with 422 }

          it "returns a failure message" do
            expect(response.body).to match(/already been taken/)
          end
        end

        context "with empty email" do
          let(:invalid_params) do
            { email: "" }
          end

          before { put :update, params: invalid_params.merge(id: User.first.id) }

          it { is_expected.to respond_with 422 }

          it "returns a failure message" do
            expect(response.body).to match(/can't be blank/)
          end
        end

        context "with used email" do
          let(:invalid_params) do
            { email: "usertaken@email.com" }
          end

          before { put :update, params: invalid_params.merge(id: User.first.id) }

          it { is_expected.to respond_with 422 }

          it "returns a failure message" do
            expect(response.body).to match(/already been taken/)
          end
        end

        context "with short password" do
          let(:invalid_params) do
            { password: "12345" }
          end

          before { put :update, params: invalid_params.merge(id: User.first.id) }

          it { is_expected.to respond_with 422 }

          it "returns a failure message" do
            expect(response.body).to match(/too short/)
          end
        end

        context "with empty name" do
          let(:invalid_params) do
            { name: "" }
          end

          before { put :update, params: invalid_params.merge(id: User.first.id) }

          it { is_expected.to respond_with 422 }

          it "returns a failure message" do
            expect(response.body).to match(/can't be blank/)
          end
        end
      end
    end

    context "when not authenticated" do
      before do
        put :update, params: { username: "user-2", name: "User 2", email: "user2@email.com",
                               password: "123456", bio: "my bio",
                               id: "00000000-0000-0000-0000-000000000000" }
      end

      it { is_expected.to respond_with 401 }
    end
  end

  describe "DELETE /users/:id" do
    context "when authenticated" do
      let(:token) { JsonWebToken.encode(user_id: user.id) }

      before { request.headers["Authorization"] = "Bearer #{token}" }

      before { create(:user) }

      before { delete :destroy, params: { id: User.last.id } }

      it { is_expected.to respond_with 204 }

      it "deletes the artist" do
        expect(User.count).to eq(1)
      end
    end

    context "when not authenticated" do
      before { delete :destroy, params: { id: "00000000-0000-0000-0000-000000000000" } }

      it { is_expected.to respond_with 401 }
    end
  end
end
