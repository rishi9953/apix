import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedbackData } from '../actions/feedbackactins'; // Ensure action name and path are correct
import './feedbacklist.css';

const FeedbackList = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); // For pagination (optional)
  const dispatch = useDispatch();

  const feedbackState = useSelector((state) => state.feedback);
  const { loading, feedbacks, error } = feedbackState;

  useEffect(() => {
    dispatch(fetchFeedbackData(pageNumber)); // Fetch feedback for the current page
  }, [dispatch, pageNumber]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const openDetailsModal = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const closeDetailsModal = () => {
    setSelectedFeedback(null);
  };

  const handleNextPage = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) setPageNumber((prevPage) => prevPage - 1);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {Array(fullStars)
          .fill('★')
          .map((star, index) => (
            <span key={index} className="star-full-star">{star}</span>
          ))}
        {halfStar && <span className="star-half-star">★</span>}
        {Array(emptyStars)
          .fill('☆')
          .map((star, index) => (
            <span key={index} className="star-empty-star">{star}</span>
          ))}
      </div>
    );
  };

  return (
    <div className="feedback-list">
      <h2>Feedback List</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {feedbacks.length > 0 ? (
        <>
          <table className="feedback-table">
            <thead>
              <tr>
                <th>CHASSIS_NUMBER</th>
                <th>NAME</th>
                <th>Phone</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.chassis_number}</td>
                  <td>{feedback.name}</td>
                  <td>{feedback.mobile}</td>
                  <td>
                    <button onClick={() => openDetailsModal(feedback)}>
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={pageNumber === 1}>
              Previous
            </button>
            <span>Page {pageNumber}</span>
            <button onClick={handleNextPage}>Next</button>
          </div>
        </>
      ) : (
        <p>No Feedback Available</p>
      )}

      {/* Details Modal */}
      {selectedFeedback && (
        <div className="modal" onClick={closeDetailsModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
          >
            <span className="close" onClick={closeDetailsModal}>
              &times;
            </span>
            <table className="feedback-details-table">
              <thead>
                <tr>
                  <th>COMMENT</th>
                  <th>CREATED AT</th>
                  <th>RATING</th>
                  <th>IMAGE</th>
                </tr>
              </thead>
              <tbody>
                {selectedFeedback.feedbacks.map((feed, index) => (
                  <tr key={index}>
                    <td>{feed.comment}</td>
                    <td>{feed.created_at}</td>
                    <td>{renderStars(feed.rating)}</td>
                    <td>
                      {feed.image_url ? (
                        <img
                          className="image"
                          src={feed.image_url}
                          alt="Feedback"
                          onClick={() => openImageModal(feed.image_url)}
                        />
                      ) : (
                        'No image available'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal" onClick={closeImageModal}>
          <div className="modal-content image-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeImageModal}>
              &times;
            </span>
            <img className="modal-image" src={selectedImage} alt="Feedback" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
