require "test_helper"

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get songs" do
    get search_songs_url
    assert_response :success
  end
end
