import React from 'react';
import './Workflow.css';

export const Workflow: React.FC = () => {
  const workflowStages = [
    {
      stage: 'Draft',
      icon: '📝',
      description: 'Initial content creation and editing',
      actions: ['Create', 'Edit', 'Save', 'Delete'],
      color: '#ffc107',
    },
    {
      stage: 'Review',
      icon: '👀',
      description: 'Content review and approval process',
      actions: ['Request Review', 'Approve', 'Request Changes', 'Comment'],
      color: '#17a2b8',
    },
    {
      stage: 'Published',
      icon: '✅',
      description: 'Live content visible to users',
      actions: ['Publish', 'Update', 'Schedule', 'Unpublish'],
      color: '#28a745',
    },
    {
      stage: 'Archived',
      icon: '📦',
      description: 'Content removed from public view',
      actions: ['Archive', 'Restore', 'Permanently Delete'],
      color: '#6c757d',
    },
  ];

  return (
    <div className="workflow-page">
      <div className="page-header">
        <h1>Editorial Workflow</h1>
        <p className="page-subtitle">Manage content lifecycle from draft to publication</p>
      </div>

      <div className="workflow-diagram">
        {workflowStages.map((stage, index) => (
          <React.Fragment key={stage.stage}>
            <div className="workflow-stage" style={{ borderColor: stage.color }}>
              <div className="stage-icon" style={{ background: stage.color }}>
                {stage.icon}
              </div>
              <h3 className="stage-title">{stage.stage}</h3>
              <p className="stage-description">{stage.description}</p>
              <div className="stage-actions">
                {stage.actions.map((action) => (
                  <span key={action} className="action-badge">
                    {action}
                  </span>
                ))}
              </div>
            </div>
            {index < workflowStages.length - 1 && (
              <div className="workflow-arrow">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="workflow-config">
        <h2>Workflow Configuration</h2>
        <div className="config-grid">
          <div className="config-card">
            <div className="config-icon">✓</div>
            <h3>Review Required</h3>
            <p>All content must be reviewed before publishing</p>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="config-card">
            <div className="config-icon">🤖</div>
            <h3>Auto-Publish</h3>
            <p>Automatically publish approved content</p>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="config-card">
            <div className="config-icon">🔔</div>
            <h3>Notifications</h3>
            <p>Notify users on workflow transitions</p>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="config-card">
            <div className="config-icon">👥</div>
            <h3>Multiple Reviewers</h3>
            <p>Require approval from multiple reviewers</p>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="workflow-transitions">
        <h2>Allowed Transitions</h2>
        <div className="transitions-table">
          <div className="transition-row header">
            <div className="transition-cell">From</div>
            <div className="transition-cell">To</div>
            <div className="transition-cell">Required Permission</div>
          </div>
          
          <div className="transition-row">
            <div className="transition-cell">
              <span className="status-badge draft">Draft</span>
            </div>
            <div className="transition-cell">
              <span className="status-badge review">Review</span>
            </div>
            <div className="transition-cell">
              <span className="permission-badge">article.update</span>
            </div>
          </div>

          <div className="transition-row">
            <div className="transition-cell">
              <span className="status-badge review">Review</span>
            </div>
            <div className="transition-cell">
              <span className="status-badge published">Published</span>
            </div>
            <div className="transition-cell">
              <span className="permission-badge">article.publish</span>
            </div>
          </div>

          <div className="transition-row">
            <div className="transition-cell">
              <span className="status-badge review">Review</span>
            </div>
            <div className="transition-cell">
              <span className="status-badge draft">Draft</span>
            </div>
            <div className="transition-cell">
              <span className="permission-badge">article.update</span>
            </div>
          </div>

          <div className="transition-row">
            <div className="transition-cell">
              <span className="status-badge published">Published</span>
            </div>
            <div className="transition-cell">
              <span className="status-badge archived">Archived</span>
            </div>
            <div className="transition-cell">
              <span className="permission-badge">article.archive</span>
            </div>
          </div>

          <div className="transition-row">
            <div className="transition-cell">
              <span className="status-badge archived">Archived</span>
            </div>
            <div className="transition-cell">
              <span className="status-badge published">Published</span>
            </div>
            <div className="transition-cell">
              <span className="permission-badge">article.publish</span>
            </div>
          </div>
        </div>
      </div>

      <div className="workflow-info">
        <div className="info-card">
          <h3>📋 Workflow Best Practices</h3>
          <ul>
            <li>Always review content before publishing</li>
            <li>Use draft status for work in progress</li>
            <li>Add comments when requesting changes</li>
            <li>Archive outdated content instead of deleting</li>
            <li>Use scheduled publishing for time-sensitive content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
