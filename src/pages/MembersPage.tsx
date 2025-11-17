const MOCK_MEMBERS = [
  {
    id: 1,
    name: "山田 太郎",
    rank: "ゴールド",
    country: "日本",
    lastLogin: "2025-11-15",
  },
  {
    id: 2,
    name: "李 小龍",
    rank: "シルバー",
    country: "中国",
    lastLogin: "2025-11-16",
  },
  {
    id: 3,
    name: "Kim Hana",
    rank: "ブロンズ",
    country: "韓国",
    lastLogin: "2025-11-10",
  },
];

export default function MembersPage() {
  return (
    <>
      <header className="topbar">
        <div>
          <div className="page-title">会員管理</div>
          <div className="page-subtitle">
            多玩国の会員情報を閲覧・メンテナンスする画面です。（ダミーデータ）
          </div>
        </div>
      </header>

      <section className="orders">
        <div className="orders-toolbar">
          <div className="orders-filters">
            <input
              className="search-input"
              placeholder="氏名／国籍などで検索（未実装）"
              disabled
            />
          </div>
          <button className="primary-button" disabled>
            新規会員登録（今後実装予定）
          </button>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>会員ID</th>
                <th>氏名</th>
                <th>会員ランク</th>
                <th>国・地域</th>
                <th>最終ログイン</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MEMBERS.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.rank}</td>
                  <td>{m.country}</td>
                  <td>{m.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
