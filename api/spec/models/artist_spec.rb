require "rails_helper"

describe Artist do
  subject { create(:artist) }

  describe "#name" do
    context "when name is present" do
      it { is_expected.to validate_presence_of(:name) }
    end

    context "when name is not present" do
      it { is_expected.to_not validate_absence_of(:name) }
    end
  end

  describe "#songs" do
    it { is_expected.to have_many(:songs) }
  end

  describe "#default_scope" do
    it "orders by created_at asc" do
      expect(Artist.all.to_sql).to eq(Artist.order(:created_at).to_sql)
    end
  end
end
