import Card from "@/components/ui/Card";

export default function KnowledgeBaseCard() {
  return (
    <Card>
      {/* Icon */}
      <div className="text-5xl mb-6">🧠</div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-4">
        Knowledge Base Status
      </h2>

      {/* Description */}
      <p className="text-zinc-400 text-lg leading-relaxed mb-8">
        Your vector database and retrieval system are ready for
        document embeddings and semantic search.
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-zinc-400 mb-2">Documents</p>
          <p className="text-3xl font-bold">24</p>
        </div>

        <div>
          <p className="text-zinc-400 mb-2">Embeddings</p>
          <p className="text-3xl font-bold">12,847</p>
        </div>

        <div>
          <p className="text-zinc-400 mb-2">Vector DB</p>
          <p className="text-3xl font-bold">Ready</p>
        </div>
      </div>
    </Card>
  );
}