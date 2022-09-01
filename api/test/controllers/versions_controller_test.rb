require "test_helper"

class VersionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get versions_index_url
    assert_response :success
  end

  test "should get show" do
    get versions_show_url
    assert_response :success
  end

  test "should get create" do
    get versions_create_url
    assert_response :success
  end

  test "should get update" do
    get versions_update_url
    assert_response :success
  end

  test "should get destroy" do
    get versions_destroy_url
    assert_response :success
  end
end
