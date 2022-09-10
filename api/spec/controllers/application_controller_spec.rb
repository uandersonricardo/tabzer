require "rails_helper"

describe ApplicationController do
  describe "GET /not_found" do
    it "returns a 404 status code" do
      get :not_found, params: { a: "not_found" }

      expect(response).to have_http_status(404)
    end
  end
end
