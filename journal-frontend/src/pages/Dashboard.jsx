import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { journalAPI } from '../services/api';
import JournalCard from '../components/JournalCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);
  
  // Form states
  const [newJournal, setNewJournal] = useState({ title: '', content: '' });
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Fetch journals on mount
  useEffect(() => {
    fetchJournals();
  }, [user]);

  const fetchJournals = async () => {
    if (!user?.userId) {
      // If no userId in context, try to find it
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const data = await journalAPI.getByUser(user.userId);
      setJournals(data);
    } catch (err) {
      setError('Failed to load journals. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJournal = async (e) => {
    e.preventDefault();
    if (!user?.userId) {
      setError('User ID not found. Please try logging in again.');
      return;
    }
    
    setCreating(true);
    try {
      const created = await journalAPI.create(
        newJournal.title, 
        newJournal.content, 
        user.userId
      );
      setJournals(prev => [created, ...prev]);
      setNewJournal({ title: '', content: '' });
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message || 'Failed to create journal');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteJournal = async (journalId) => {
    if (!window.confirm('Are you sure you want to delete this journal?')) {
      return;
    }
    
    setDeleting(journalId);
    try {
      await journalAPI.delete(journalId);
      setJournals(prev => prev.filter(j => j.journalId !== journalId));
    } catch (err) {
      setError('Failed to delete journal');
    } finally {
      setDeleting(null);
    }
  };

  const handleViewJournal = (journal) => {
    setSelectedJournal(journal);
    setShowViewModal(true);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container container py-5 mt-5">
        {/* Header */}
        <div className="dashboard-header mb-5">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="dashboard-title">
                {getGreeting()}, <span className="gradient-text">{user?.email?.split('@')[0] || 'Writer'}</span>! 👋
              </h1>
              <p className="dashboard-subtitle">
                {journals.length === 0 
                  ? "Start your journaling journey by creating your first entry"
                  : `You have ${journals.length} journal ${journals.length === 1 ? 'entry' : 'entries'}`
                }
              </p>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <button 
                className="btn btn-primary btn-lg btn-glow"
                onClick={() => setShowCreateModal(true)}
              >
                <span className="me-2">✏️</span>
                New Journal
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        {/* Journal Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your journals...</p>
          </div>
        ) : journals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No journals yet</h3>
            <p>Create your first journal entry and start documenting your thoughts!</p>
            <button 
              className="btn btn-primary btn-glow"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Journal
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {journals.map(journal => (
              <div className="col-md-6 col-lg-4" key={journal.journalId}>
                <JournalCard 
                  journal={journal}
                  onView={handleViewJournal}
                  onDelete={handleDeleteJournal}
                />
                {deleting === journal.journalId && (
                  <div className="delete-overlay">
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Deleting...</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-backdrop show" onClick={() => setShowCreateModal(false)}>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <span className="me-2">✨</span>
                    Create New Journal
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowCreateModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleCreateJournal}>
                  <div className="modal-body">
                    <div className="mb-4">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="What's on your mind?"
                        value={newJournal.title}
                        onChange={e => setNewJournal(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Write your thoughts here..."
                        value={newJournal.content}
                        onChange={e => setNewJournal(prev => ({ ...prev, content: e.target.value }))}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-glow"
                      disabled={creating}
                    >
                      {creating ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <span className="me-2">💾</span>
                          Save Journal
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedJournal && (
        <div className="modal-backdrop show" onClick={() => setShowViewModal(false)}>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg" onClick={e => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedJournal.title}</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowViewModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="journal-view-content">
                    {selectedJournal.content}
                  </div>
                </div>
                <div className="modal-footer">
                  <span className="text-muted me-auto">
                    Journal #{selectedJournal.journalId}
                  </span>
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setShowViewModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
