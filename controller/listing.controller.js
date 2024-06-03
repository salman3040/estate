import Listing from '../models/list.model.js';
import errorHandler from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json({
      listing,
      message: 'Listing created successfully',
    });
  } catch (error) {
    next(error);
    // console.log(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'Listing not found'));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    next(errorHandler(404, 'Listing not found'));
  }
  if (req.user.id !== listing.userRef) {
    next(errorHandler(401, 'You can only update your own listings'));
  }
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res
    .status(200)
    .json({ updatedListing, message: 'Listing updated successfully' });
  try {
  } catch (error) {
    next(error);
  }
};

export const getSearchListing = async (req, res, next) => {
  try {
    const limits = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type === false) {
      type = { $in: ['sale', 'rent'] };
    }
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const listing = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limits)
      .skip(startIndex);
    // if (listing.length === 0) {
    //   return res.status(404).json({ message: 'No listings found.' });
    // }
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, 'Listing not found'));
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(401, 'You do not have permission to delete this listing')
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing has been deleted' });
  } catch (error) {
    next(error);
  }
};
