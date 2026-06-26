import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    if (!email.trim()) {
      alert("please enter your email");
      return;
    }

    localStorage.setItem("userEmail", email);
    navigate("/signup");
  };

  return (
    <>
      <nav className={styles.nav}>
        <h2
          className={styles["web-name"]}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          BUDGIFY
        </h2>

        <div className={styles["nav-links"]}>
          <span
            onClick={() =>
              document
                .getElementById("features")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Features
          </span>

          <span
            onClick={() =>
              document
                .getElementById("how")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            How It Works
          </span>

          <span
            onClick={() =>
              document
                .getElementById("why")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            About
          </span>
        </div>

        <div className={styles["nav-right"]}>
          <span onClick={() => navigate("/login")}>Login</span>

          <button onClick={() => navigate("/signup")}>Get Started</button>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles["hero-left"]}>
          <span className={styles["hero-tag"]}>
            ✧ AI Powered Expense Tracking
          </span>

          <h2>
            Smart <span>Expense</span>
            <br />
            Tracker For Your
            <br />
            Daily Budget
          </h2>

          <p>
            Track every expense, visualize your spending, receive AI-powered
            insights, and manage your money smarter than ever before.
          </p>

          <div className={styles["email-box"]}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleGetStarted}>Get Started</button>
          </div>
        </div>

        <div className={styles["hero-right"]}>
          <div className={styles["bg-circle"]}></div>
          <div className={styles["dot-grid"]}></div>

          <div className={styles["star"] + " " + styles["star1"]}>✦</div>
          <div className={styles["star"] + " " + styles["star2"]}>✦</div>

         
          <div className={styles["balance-card"] + " " + styles.card}>
            <div className={styles["card-top"]}>
              <span>Total Balance</span>
              <span>⋮</span>
            </div>

            <h2>₹24,850</h2>

            <p className={styles.green}>
              <span>↗ 12.5% vs last month</span>
            </p>

            <div className={styles.graph}>
              <svg viewBox="0 0 260 120">
                <path
                  d="M10 90 C40 65,70 40,100 55 S150 90,180 55 S220 40,250 20"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M10 90 C40 65,70 40,100 55 S150 90,180 55 S220 40,250 20 L250 120 L10 120 Z"
                  fill="rgba(37,99,235,.08)"
                />
              </svg>
            </div>
          </div>

       
          <div className={styles["category-card"] + " " + styles.card}>
            <span className={styles.icon}>🛍️</span>

            <div>
              <p>Top Category</p>
              <h3>Shopping</h3>
              <h3>₹4,250</h3>
            </div>
          </div>

         
          <div className={styles["ai-card"] + " " + styles.card}>
            <h4>🤖 AI Insight</h4>

            <p>
              You're spending <span>12% less</span> this month.
              <br />
              Keep it up! 🎉
            </p>
          </div>
        </div>
      </section>

    
      <section id="features" className={styles.features}>
        <h2>Features</h2>

        <div>
          <div>
            <h3>add expense</h3>
            <p>quickly add your daily expenses with category</p>
          </div>

          <div>
            <h3>analytics</h3>
            <p>track your money where it is going with insights</p>
          </div>

          <div>
            <h3>categories</h3>
            <p>organize expenses into smart categories</p>
          </div>

          <div>
            <h3>fast and simple</h3>
            <p>clean UI with smooth experience</p>
          </div>
        </div>
      </section>

     
      <section id="how" className={styles.how}>
        <div className={styles["how-top"]}>
          <p>• HOW IT WORKS •</p>
          <h2>
            Get Started In <span>Minutes.</span>
          </h2>
          <p className={styles["how-sub"]}>
            Simple steps to smarter money management with Budgify.
          </p>
        </div>

        <div className={styles["how-container"]}>
          <div className={styles["how-left"]}>
            <h1>
              Smart Steps to <br />
              Financial <span>Freedom</span>
            </h1>

            <div className={styles["hero-illustration"]}>
              <img
                src="/hero.svg"
                alt="Hero Illustration"
                className={styles["hero-image"]}
              />
            </div>

            <div className={styles.plant}></div>
            <div className={styles["graph-card"]}>📊</div>
            <div className={styles["tick-card"]}>✔</div>
          </div>

          <div className={styles["how-right"]}>
            <div className={styles["curve-line"]}></div>

            <div className={styles.step}>
              <div className={styles["step-number"]}>01</div>

              <div className={styles["step-content"]}>
                <div className={styles["step-icon"]}>🎯</div>
                <div>
                  <h3>Connect & Set Your Goals</h3>
                  <p>
                    Tell Budgify about your expenses, income and financial
                    goals in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles["step-number"]}>02</div>

              <div className={styles["step-content"]}>
                <div className={styles["step-icon"]}>🤖</div>

                <div>
                  <h3>AI Assists & Automates</h3>
                  <p>
                    Budgify categorizes transactions, tracks spending
                    automatically and generates smart insights.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles["step-number"]}>03</div>

              <div className={styles["step-content"]}>
                <div className={styles["step-icon"]}>📈</div>

                <div>
                  <h3>Review, Control & Improve</h3>
                  <p>
                    View reports, monitor budgets and improve your financial
                    habits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section id="why" className={styles.why}>
        <h2>Why Budgify?</h2>

        <p>
          Managing money should be simple, fast, and stress-free. ExpenseTracker
          helps you understand your spending habits and take control of your
          finances.
        </p>

        <div>
          <div>
            <h3>simple design</h3>
            <p>no confusion, clean and easy UI</p>
          </div>

          <div>
            <h3>smart tracking</h3>
            <p>track every expense in real time</p>
          </div>

          <div>
            <h3>secure data</h3>
            <p>all data stored safely in database</p>
          </div>

          <div>
            <h3>AI insights</h3>
            <p>AI insights for smart budgeting</p>
          </div>
        </div>
      </section>

     
      <footer className={styles.footer}>
        <div className={styles["footer-top"]}>
          <h2>BUDGIFY</h2>
          <p>AI-powered expense tracking for smarter budgeting.</p>
        </div>

        <hr />

        <div className={styles["footer-middle"]}>
          <div className={styles["footer-column"]}>
            <h3>Quick Links</h3>

            <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Home
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Features
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("how")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              How It Works
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("why")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              About
            </span>
          </div>

          <div className={styles["footer-column"]}>
            <h3>Product</h3>
            <span>AI Insights</span>
            <span>Analytics</span>
            <span>Reports</span>
            <span>Budget Alerts</span>
          </div>

          <div className={styles["footer-column"]}>
            <h3>Resources</h3>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Support</span>
          </div>
        </div>

        <hr />

        <div className={styles["footer-bottom"]}>
          <p>© {new Date().getFullYear()} BUDGIFY. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;