
import { useState } from "react";
import { Download, UploadCloud, CreditCard, MessageCircle } from "lucide-react";

export default function App() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
      setResultReady(false);
      setShowScores(false);
    }
  };

  const handleStartProcessing = () => {
    if (!files) return;
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setResultReady(true);
          setShowScores(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handlePayment = () => {
    window.open("https://buy.stripe.com/test_dummycheckoutlink", "_blank");
  };

  const handleReviewSubmit = () => {
    if (review.trim()) {
      setReviews((prev) => [review, ...prev]);
      setReview("");
    }
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem" }}>
        ピンボケ判定AI - Webサービス版 v0
      </h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        写真館・カメラマン専用、ピンボケ写真を自動で除外する画期的なクラウドサービス。<br />
        アプリ不要、ブラウザだけでOK。AIが"これはボツ"を代行します。
      </p>

      <div style={{ margin: "2rem 0" }}>
        <label>写真アップロード</label><br />
        <input type="file" accept="image/*" multiple onChange={handleUpload} />
      </div>
      <button onClick={handleStartProcessing} disabled={!files || isProcessing}>
        <UploadCloud style={{ verticalAlign: "middle" }} size={18} /> 処理スタート
      </button>

      {isProcessing && (
        <div style={{ marginTop: "1rem" }}>
          <progress value={progress} max="100" />
        </div>
      )}

      {resultReady && (
        <div style={{ marginTop: "2rem" }}>
          <button style={{ marginRight: "1rem" }}>
            <Download size={16} /> OK写真だけをZIPでダウンロード
          </button>
          <button onClick={handlePayment}>
            <CreditCard size={16} /> サブスク登録（月額1,980円）
          </button>
        </div>
      )}

      {showScores && files && (
        <div style={{ marginTop: "2rem" }}>
          <h3>ピントスコア（仮表示）</h3>
          <ul>
            {Array.from(files).map((file, idx) => (
              <li key={idx}>{file.name} - スコア：{Math.floor(Math.random() * 100)}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h2>
          <MessageCircle style={{ verticalAlign: "middle" }} size={20} /> ユーザーレビュー
        </h2>
        <textarea
          style={{ width: "100%", height: "80px", marginTop: "0.5rem" }}
          placeholder="このサービスを使ってみた感想をお書きください"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleReviewSubmit} disabled={!review.trim()}>投稿する</button>
        <ul>
          {reviews.map((r, i) => (
            <li key={i} style={{ background: "#f0f0f0", padding: "0.5rem", marginTop: "0.5rem" }}>{r}</li>
          ))}
        </ul>
      </div>

      <p style={{ marginTop: "2rem", fontSize: "0.9rem", textAlign: "center", color: "#999" }}>
        Webアプリ版でも、スマホでも、写真業務の時短をお手伝いします。<br />
        月額1,980円〜、AIがあなたの"選別作業"を代行します。
      </p>
    </div>
  );
}
