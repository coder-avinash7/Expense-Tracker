import React from "react";
import { Link } from "react-router-dom";

import {
  LuWalletCards,
  LuChartNoAxesColumnIncreasing,
  LuChartPie,
  LuShieldCheck,
  LuMonitor,
  LuArrowUp,
  LuArrowDown,
  LuPlus,
  LuHouse,
  LuUser,
  LuActivity,
} from "react-icons/lu";

import "./AuthLayout.css";


const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page">

      {/* =====================================================
          LEFT HERO
      ====================================================== */}

      <section className="auth-hero">

        {/* Background effects */}

        <div className="neon-glow glow-purple" />
        <div className="neon-glow glow-cyan" />
        <div className="neon-glow glow-pink" />

        <div className="circuit-pattern">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>


        {/* =================================================
            LOGO
        ================================================== */}

        <div className="hero-logo">

          <div className="hero-logo-icon">
            <LuWalletCards size={25} />
          </div>

          <span>
            Expense Tracker
          </span>

        </div>


        {/* =================================================
            HERO CONTENT
        ================================================== */}

        <div className="hero-content">

          {/* Pill */}

          <div className="finance-pill">

            <span className="finance-dot" />

            <span>
              Smart Finance
            </span>

            <b>•</b>

            <span>
              Better Tomorrow
            </span>

          </div>


          {/* Heading */}

          <h1 className="hero-title">

            Track Your

            <br />

            <span className="gradient-pink">
              Income
            </span>

            <span>
              {" & "}
            </span>

            <span className="gradient-purple">
              Expenses
            </span>

          </h1>


          {/* Description */}

          <p className="hero-description">
            Manage your money, track your spending, and achieve
            <br className="desktop-only" />
            your financial goals — all in one place.
          </p>


          {/* Features */}

          <div className="hero-features">

            <Feature
              icon={<LuChartNoAxesColumnIncreasing />}
              title="Track Expenses"
              description="See where your money goes"
              type="green"
            />

            <Feature
              icon={<LuChartPie />}
              title="Visual Insights"
              description="Beautiful charts and reports"
              type="pink"
            />

            <Feature
              icon={<LuShieldCheck />}
              title="Secure & Private"
              description="Your data stays safe"
              type="purple"
            />

            <Feature
              icon={<LuMonitor />}
              title="Access Anywhere"
              description="On all your devices"
              type="orange"
            />

          </div>


          {/* Phone */}

          <PhoneMockup />


          {/* Small floating graph icon */}

          <div className="floating-activity">
            <LuActivity size={18} />
          </div>


          {/* Quote */}

          <div className="hero-quote">

            <span>
              "Small Steps
            </span>

            <span>
              Big Financial Freedom"
            </span>

            <div />

          </div>

        </div>

      </section>


      {/* =====================================================
          RIGHT AUTH
      ====================================================== */}

      <section className="auth-right">

        {/* Top signup */}

        <div className="auth-top">

          <span>
            New here?
          </span>

          <Link to="/SignUp">
            Sign Up
          </Link>

        </div>


        {/* Card */}

        <div className="auth-content">

          <div className="auth-card">

            {children}

          </div>

        </div>


        {/* Decorative star */}

        <div className="auth-star">
          ✦
        </div>


        {/* Dots */}

        <div className="auth-dots">

          {Array.from({ length: 25 }).map((_, index) => (
            <span key={index} />
          ))}

        </div>

      </section>

    </div>
  );
};


/* =========================================================
   FEATURE
========================================================= */

const Feature = ({
  icon,
  title,
  description,
  type,
}) => {

  return (
    <div className="hero-feature">

      <div className={`feature-icon feature-${type}`}>
        {icon}
      </div>

      <div className="feature-text">

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   PHONE MOCKUP
========================================================= */

const PhoneMockup = () => {

  return (
    <div className="phone-wrapper">

      <div className="phone">

        {/* Phone outer buttons */}

        <div className="phone-side-button side-one" />
        <div className="phone-side-button side-two" />


        {/* Screen */}

        <div className="phone-screen">

          {/* Dynamic island */}

          <div className="phone-island">
            <span />
          </div>


          {/* Status */}

          <div className="phone-status">

            <span>
              9:41
            </span>

            <span>
              ●●●
            </span>

          </div>


          {/* Greeting */}

          <div className="phone-greeting">

            <span>
              Good Morning 👋
            </span>

            <small>
              Track. Save. Grow.
            </small>

          </div>


          {/* Balance */}

          <div className="balance-card">

            <div className="balance-top">

              <span>
                Total Balance
              </span>

              <span>
                This Month⌄
              </span>

            </div>

            <strong>
              $12,450.00
            </strong>

            <small>
              ↑ 12%
            </small>

          </div>


          {/* Chart */}

          <div className="phone-chart">

            <div className="chart-title">
              Monthly Overview
            </div>

            <div className="chart-area">

              <div className="chart-line" />

              <div className="chart-bar chart-1" />
              <div className="chart-bar chart-2" />
              <div className="chart-bar chart-3" />
              <div className="chart-bar chart-4" />
              <div className="chart-bar chart-5" />
              <div className="chart-bar chart-6" />

            </div>

            <div className="chart-months">

              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>

            </div>

          </div>


          {/* Money cards */}

          <div className="money-row">

            <div className="money-card money-income">

              <div className="money-icon">
                <LuArrowUp size={12} />
              </div>

              <div>
                <span>Income</span>
                <strong>$4,320</strong>
              </div>

            </div>


            <div className="money-card money-expense">

              <div className="money-icon">
                <LuArrowDown size={12} />
              </div>

              <div>
                <span>Expenses</span>
                <strong>$2,460</strong>
              </div>

            </div>

          </div>


          {/* Savings */}

          <div className="savings-card">

            <div className="saving-ring">

              <span>
                68%
              </span>

            </div>

            <div className="saving-content">

              <strong>
                Savings Goal
              </strong>

              <span>
                $1,860 of $2,500
              </span>

              <div className="saving-progress">
                <div />
              </div>

            </div>

          </div>


          {/* Bottom navigation */}

          <div className="phone-nav">

            <LuHouse />

            <LuChartNoAxesColumnIncreasing />

            <div className="phone-add">
              <LuPlus />
            </div>

            <LuWalletCards />

            <LuUser />

          </div>

        </div>

      </div>


      {/* Phone reflection */}

      <div className="phone-reflection" />

    </div>
  );
};


export default AuthLayout;