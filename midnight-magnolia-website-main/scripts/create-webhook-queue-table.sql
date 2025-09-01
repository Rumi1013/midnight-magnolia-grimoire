-- Create webhook queue table for reliable processing
CREATE TABLE IF NOT EXISTS webhook_queue (
    id SERIAL PRIMARY KEY,
    webhook_topic VARCHAR(100) NOT NULL,
    shopify_id VARCHAR(50) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    retry_count INTEGER NOT NULL DEFAULT 0,
    max_retries INTEGER NOT NULL DEFAULT 5,
    next_retry_at TIMESTAMP,
    last_error TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_webhook_queue_status ON webhook_queue(status);
CREATE INDEX IF NOT EXISTS idx_webhook_queue_next_retry ON webhook_queue(next_retry_at);
CREATE INDEX IF NOT EXISTS idx_webhook_queue_topic ON webhook_queue(webhook_topic);
CREATE INDEX IF NOT EXISTS idx_webhook_queue_created_at ON webhook_queue(created_at);

-- Create index for dequeue operation
CREATE INDEX IF NOT EXISTS idx_webhook_queue_dequeue ON webhook_queue(status, next_retry_at, created_at);

-- Add constraint to ensure valid status values
ALTER TABLE webhook_queue 
ADD CONSTRAINT chk_webhook_queue_status 
CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'dead_letter'));
