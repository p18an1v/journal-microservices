const JournalCard = ({ journal, onView, onDelete, onEdit }) => {
  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="journal-card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0">{journal.title}</h5>
          <span className="journal-id">#{journal.journalId}</span>
        </div>
        
        <p className="card-text text-muted">
          {truncateContent(journal.content)}
        </p>
        
        <div className="card-actions">
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => onView(journal)}
          >
            👁️ View
          </button>
          <button 
            className="btn btn-outline-info btn-sm"
            onClick={() => onEdit && onEdit(journal)}
          >
            ✏️ Edit
          </button>
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(journal.journalId)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
