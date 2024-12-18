import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRoom } from '../api/rooms';
import Header from '../components/Header';
import { FaDoorOpen, FaInfoCircle } from 'react-icons/fa';

function AddRoomPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await addRoom({ name, description });
      navigate('/home');
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <FaDoorOpen size={40} className="text-primary mb-2" />
                  <h2 className="card-title">Add New Room</h2>
                  <p className="text-muted">Create a new space in your smart home</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Room Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaDoorOpen />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Living Room, Kitchen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaInfoCircle />
                      </span>
                      <textarea
                        className="form-control"
                        placeholder="Brief description of the room"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        required
                      />
                    </div>
                    <small className="text-muted mt-1">
                      Add details about the room's purpose or location
                    </small>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating Room...
                        </>
                      ) : (
                        'Create Room'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoomPage;