require "rails_helper"

describe Version do
  subject { create(:version) }

  describe "#name" do
    context "when name is present" do
      it { is_expected.to validate_presence_of(:name) }
    end

    context "when name is not present" do
      it { is_expected.to_not validate_absence_of(:name) }
    end
  end

  describe "#instrument" do
    context "when instrument is present" do
      it { is_expected.to validate_presence_of(:instrument) }
    end

    context "when instrument is not present" do
      it { is_expected.to_not validate_absence_of(:instrument) }
    end
  end

  describe "#tuning" do
    context "when tuning is present" do
      it { is_expected.to validate_presence_of(:tuning) }
    end

    context "when tuning is not present" do
      it { is_expected.to_not validate_absence_of(:tuning) }
    end
  end

  describe "#difficulty" do
    context "when difficulty is present" do
      it { is_expected.to validate_presence_of(:difficulty) }
    end

    context "when difficulty is not present" do
      it { is_expected.to_not validate_absence_of(:difficulty) }
    end
  end

  describe "#tabs" do
    context "when tabs is present" do
      it { is_expected.to validate_presence_of(:tabs) }
    end

    context "when tabs is not present" do
      it { is_expected.to_not validate_absence_of(:tabs) }
    end
  end

  describe "#song" do
    it { is_expected.to belong_to(:song) }

    context "when song is present" do
      it { is_expected.to validate_presence_of(:song) }
    end

    context "when song is not present" do
      it { is_expected.to_not validate_absence_of(:song) }
    end
  end

  describe "#user" do
    it { is_expected.to belong_to(:user) }

    context "when user is present" do
      it { is_expected.to validate_presence_of(:user) }
    end

    context "when user is not present" do
      it { is_expected.to_not validate_absence_of(:user) }
    end
  end

  describe "#default_scope" do
    it "orders by created_at asc" do
      expect(Version.all.to_sql).to eq(Version.order(:created_at).to_sql)
    end
  end
end
