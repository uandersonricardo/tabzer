require "rails_helper"

describe User do
  subject { create(:user) }

  describe "#email" do
    context "when email is present" do
      it { is_expected.to validate_presence_of(:email) }
    end

    context "when email is not present" do
      it { is_expected.to_not validate_absence_of(:email) }
    end

    context "when email is unique" do
      it { is_expected.to validate_uniqueness_of(:email) }
    end

    context "when email is valid" do
      it { is_expected.to allow_value("john@doe.com").for(:email) }
    end

    context "when email is not valid" do
      it { is_expected.to_not allow_value("john").for(:email) }
      it { is_expected.to_not allow_value(nil).for(:email) }
    end
  end

  describe "#username" do
    context "when username is present" do
      it { is_expected.to validate_presence_of(:username) }
    end

    context "when username is not present" do
      it { is_expected.to_not validate_absence_of(:username) }
    end

    context "when username is unique" do
      it { is_expected.to validate_uniqueness_of(:username) }
    end

    context "when username is valid" do
      it { is_expected.to allow_value("joe").for(:username) }
    end

    context "when username is not valid" do
      it { is_expected.to_not allow_value(nil).for(:username) }
    end
  end

  describe "#password" do
    context "when password is present" do
      it { is_expected.to validate_presence_of(:password) }
    end

    context "when password is not present" do
      it { is_expected.to_not validate_absence_of(:password) }
    end

    context "when password length is valid" do
      it { is_expected.to validate_length_of(:password).is_at_least(6) }
    end

    context "when password is valid" do
      it { is_expected.to allow_value("123456").for(:password) }
    end

    context "when password is not valid" do
      it { is_expected.to_not allow_value(nil).for(:password) }
    end
  end

  describe "#password_confirmation" do
    it { is_expected.to validate_confirmation_of(:password) }
  end

  describe "#has_secure_password" do
    it { is_expected.to have_secure_password }
  end

  describe "#versions" do
    it { is_expected.to have_many(:versions) }
  end

  describe "#default_scope" do
    it "orders by created_at asc" do
      expect(User.all.to_sql).to eq(User.order(:created_at).to_sql)
    end
  end
end
