import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ReservationsPage from "./pages/ReservationsPage";
import MembersPage from "./pages/MembersPage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <div className="app">
      {/* サイドバー */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">環</span>
          <div className="logo-text">
            <div className="logo-title">トラベルリンク 管理システム</div>
            <div className="logo-subtitle">TravelLink Admin</div>
          </div>
        </div>

        <nav className="menu">
          <NavLink
            to="/reservations"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            予約管理
          </NavLink>

          <NavLink
            to="/members"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            会員管理
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            商品管理
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            売上レポート
          </NavLink>
        </nav>
      </aside>

      {/* 右側：各ページを切り替え */}
      <div className="main">
        <Routes>
          {/* デフォルトは予約管理へリダイレクト */}
          <Route path="/" element={<Navigate to="/reservations" replace />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
