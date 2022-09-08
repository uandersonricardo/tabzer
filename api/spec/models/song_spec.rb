require "rails_helper"

describe Song do
  subject { create(:song) }

  describe "#name" do
    context "when name is present" do
      it { is_expected.to validate_presence_of(:name) }
    end

    context "when name is not present" do
      it { is_expected.to_not validate_absence_of(:name) }
    end
  end

  describe "#genre" do
    context "when genre is present" do
      it { is_expected.to validate_presence_of(:genre) }
    end

    context "when genre is not present" do
      it { is_expected.to_not validate_absence_of(:genre) }
    end
  end

  describe "#artist" do
    it { is_expected.to belong_to(:artist) }

    context "when artist is present" do
      it { is_expected.to validate_presence_of(:artist) }
    end

    context "when artist is not present" do
      it { is_expected.to_not validate_absence_of(:artist) }
    end
  end

  describe "#versions" do
    it { is_expected.to have_many(:versions) }
  end

  describe "#default_scope" do
    it "orders by created_at asc" do
      expect(Song.all.to_sql).to eq(Song.order(:created_at).to_sql)
    end
  end
end
