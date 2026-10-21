
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import "./Appointment.css";

/* =====================================
   SIDEBAR MENU
===================================== */

const menuItems = [
  { icon: "▦", label: "Dashboard", path: "/dashboard" },
  { icon: "▤", label: "Appointments", path: "/appointments" },
  { icon: "♙", label: "Find Doctor", path: "/find-doctor" },
  { icon: "▣", label: "Find Clinic", path: "/find-clinic" },
  { icon: "▤", label: "Chat", path: "/chat" },
  { icon: "▤", label: "Find MarketPlace", path: "/marketplace" },
  { icon: "➤", label: "Find Pharmacy", path: "/find-pharmacy" },
  { icon: "▣", label: "My Dependents", path: "/my-dependents" },
  { icon: "⚙", label: "My Account", path: "/account" },
  { icon: "⚙", label: "Settings", path: "/settings" },
];

/* =====================================
   INITIAL APPOINTMENTS
===================================== */

const initialAppointments = [
  {
    id: "sample-1",
    doctor: "Dr. Bilal",
    specialty: "Examination",
    dateISO: "2022-04-25",
    time: "10:00",
    notes: "",
    color: "blue",
  },
  {
    id: "sample-2",
    doctor: "Dr. Ibrahim",
    specialty: "Consultation",
    dateISO: "2022-04-25",
    time: "11:00",
    notes: "",
    color: "green",
  },
  {
    id: "sample-3",
    doctor: "Doctor Checkup",
    specialty: "General Checkup",
    dateISO: "2022-04-28",
    time: "09:00",
    notes: "",
    color: "red",
  },
];

const STORAGE_KEY = "myPatientHubAppointments";

/* =====================================
   CHART DATA
===================================== */

const proceduresData = [
  { month: "Apr", value: 45 },
  { month: "May", value: 40 },
  { month: "Jun", value: 60 },
  { month: "Jul", value: 58 },
  { month: "Aug", value: 78 },
  { month: "Sep", value: 65 },
  { month: "Oct", value: 88 },
  { month: "Nov", value: 78 },
  { month: "Dec", value: 96 },
];

const treatmentsData = [
  { month: "Apr", value: 45 },
  { month: "May", value: 40 },
  { month: "Jun", value: 48 },
  { month: "Jul", value: 55 },
  { month: "Aug", value: 78 },
  { month: "Sep", value: 62 },
  { month: "Oct", value: 88 },
  { month: "Nov", value: 76 },
  { month: "Dec", value: 96 },
];

const barData = [
  { day: "Mon", procedures: 44, treatments: 13, consultations: 11, other: 21 },
  { day: "Tue", procedures: 55, treatments: 23, consultations: 17, other: 7 },
  { day: "Wed", procedures: 41, treatments: 20, consultations: 15, other: 25 },
  { day: "Thu", procedures: 67, treatments: 8, consultations: 15, other: 13 },
  { day: "Fri", procedures: 22, treatments: 13, consultations: 21, other: 22 },
  { day: "Sat", procedures: 43, treatments: 27, consultations: 14, other: 8 },
];

/* =====================================
   HELPER FUNCTIONS
===================================== */

const getLocalDateISO = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const normalizeAppointment = (item, index = 0) => {
  let dateISO = item.dateISO;

  if (!dateISO && item.year && item.month !== undefined && item.day) {
    dateISO = `${item.year}-${String(Number(item.month) + 1).padStart(
      2,
      "0"
    )}-${String(Number(item.day)).padStart(2, "0")}`;
  }

  if (!dateISO) {
    dateISO = getLocalDateISO();
  }

  const [year, month, day] = dateISO.split("-").map(Number);
  const doctor = item.doctor || item.title || "Doctor";

  return {
    ...item,
    id: item.id ?? `appointment-${Date.now()}-${index}`,
    doctor,
    title: doctor,
    specialty: item.specialty || "Consultation",
    dateISO,
    year,
    month: month - 1,
    day,
    time: item.time || "09:00",
    notes: item.notes || "",
    color: item.color || "blue",
  };
};

const formatDate = (dateISO) => {
  if (!dateISO) return "";

  const [year, month, day] = dateISO.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

/* =====================================
   STATISTICS CHART
===================================== */

function MiniChart({ title, value, increase, variant = 0 }) {
  const data = variant === 0 ? proceduresData : treatmentsData;
  const gradientId = `appointment-gradient-${variant}`;

  return (
    <div className="appointment-stat-card">
      <div className="appointment-stat-title">{title}</div>

      <div className="appointment-stat-value">
        {value} <span>+{increase}</span>
      </div>

      <div className="appointment-line-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 3, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#08c4ed" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#08c4ed" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e6ebf1"
              strokeDasharray="4 5"
              vertical
            />

            <XAxis
              dataKey="month"
              tick={false}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 120]}
              ticks={[40, 80, 120]}
              tick={{ fill: "#94a1b7", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={28}
            />

            <Tooltip
              contentStyle={{
                border: "1px solid #e6ebf1",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(amount) => [amount, title]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#08c4ed"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="appointment-month-labels">
        {data.map((item) => (
          <span key={item.month}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

/* =====================================
   APPOINTMENT BAR CHART
===================================== */

function AppointmentBars() {
  return (
    <section className="appointment-bar-card">
      <div className="appointment-bar-heading">
        <strong>Appointment</strong>
        <span>☰</span>
      </div>

      <div className="appointment-real-bar-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barData}
            margin={{ top: 12, right: 0, left: -18, bottom: 0 }}
          >
            <CartesianGrid stroke="#e3e6eb" vertical={false} />

            <XAxis
              dataKey="day"
              tick={{ fill: "#8795aa", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 120]}
              ticks={[0, 30, 60, 90, 120]}
              tick={{ fill: "#606975", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5eaf0",
                fontSize: 12,
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={30}
              wrapperStyle={{ fontSize: 10 }}
            />

            <Bar
              dataKey="procedures"
              name="Procedures"
              stackId="appointments"
              fill="#078df5"
              maxBarSize={30}
            />

            <Bar
              dataKey="treatments"
              name="Treatments"
              stackId="appointments"
              fill="#00dba5"
              maxBarSize={30}
            />

            <Bar
              dataKey="consultations"
              name="Consultations"
              stackId="appointments"
              fill="#ffad19"
              maxBarSize={30}
            />

            <Bar
              dataKey="other"
              name="Other"
              stackId="appointments"
              fill="#ff4261"
              radius={[7, 7, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/* =====================================
   PREVIOUS APPOINTMENTS
===================================== */

const previousDoctors = [
  {
    id: "previous-1",
    name: "Dr. Mustafa",
    specialty: "Emergency",
    date: "Tuesday, April 5",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "previous-2",
    name: "Dr. Khirullah",
    specialty: "Consultation",
    date: "Friday, November 2",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: "previous-3",
    name: "Dr. Bilal",
    specialty: "Examination",
    date: "Monday, March 9",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
];

function PreviousAppointments() {
  return (
    <section className="appointment-side-card">
      <h3>Previous Appointments</h3>

      <div className="appointment-doctor-list">
        {previousDoctors.map((doctor) => (
          <div className="appointment-doctor-row" key={doctor.id}>
            <img
              className="appointment-doctor-avatar"
              src={doctor.avatar}
              alt={doctor.name}
              loading="lazy"
            />

            <div className="appointment-doctor-info">
              <strong>{doctor.name}</strong>
              <span>{doctor.specialty}</span>
            </div>

            <div className="appointment-doctor-date">
              {doctor.date.split(", ").map((part, index) => (
                <span key={`${part}-${index}`}>{part}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =====================================
   UPCOMING APPOINTMENT ITEM
===================================== */

function UpcomingAppointmentItem({ appointment, onEdit, onDelete }) {
  const [, month, day] = appointment.dateISO.split("-");

  const displayMonth = new Date(
    Number(appointment.dateISO.slice(0, 4)),
    Number(month) - 1,
    1
  ).toLocaleDateString("en-US", { month: "short" });

  return (
    <div className="appointment-upcoming-item">
      <div className="appointment-upcoming-date">
        <strong>{Number(day)}</strong>
        <span>{displayMonth}</span>
      </div>

      <div className="appointment-upcoming-info">
        <strong>{appointment.doctor}</strong>
        <span>{appointment.specialty}</span>
        <span>{formatDate(appointment.dateISO)}</span>
        <span>{formatTime(appointment.time)}</span>

        {appointment.notes && (
          <span title={appointment.notes}>Note: {appointment.notes}</span>
        )}
      </div>

      <div className="appointment-upcoming-actions">
        <button
          type="button"
          className="appointment-edit-btn"
          title="Edit appointment"
          aria-label={`Edit ${appointment.doctor}`}
          onClick={() => onEdit(appointment)}
        >
          ✎
        </button>

        <button
          type="button"
          className="appointment-delete-btn"
          title="Delete appointment"
          aria-label={`Delete ${appointment.doctor}`}
          onClick={() => onDelete(appointment)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

/* =====================================
   MAIN APPOINTMENT PAGE
===================================== */

function Appointment() {
  /* Responsive sidebar */

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 950 : false
  );

  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 950 : true
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 950;

      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  /* Tabs */

  const [activeTab, setActiveTab] = useState("appointments");

  /* Calendar month */

  const [monthDate, setMonthDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const monthName = monthDate.toLocaleString("en-US", {
    month: "long",
  });

  const todayISO = getLocalDateISO();

  /* Load saved appointments */

  const [appointments, setAppointments] = useState(() => {
    if (typeof window === "undefined") {
      return initialAppointments.map(normalizeAppointment);
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved !== null) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed.map(normalizeAppointment);
        }
      }
    } catch (error) {
      console.error("Unable to load appointments:", error);
    }

    return initialAppointments.map(normalizeAppointment);
  });

  /* Save appointments */

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
      console.error("Unable to save appointments:", error);
    }
  }, [appointments]);

  /* Booking form state */

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [doctor, setDoctor] = useState("");
  const [specialty, setSpecialty] = useState("Consultation");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("09:00");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  /* Search and upcoming period */

  const [search, setSearch] = useState("");
  const [upcomingPeriod, setUpcomingPeriod] = useState("Months");

  /* Calendar calculations */

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDay + 1;

    if (dayNumber < 1) {
      return {
        day: daysInPreviousMonth + dayNumber,
        outside: true,
        key: `previous-${index}`,
      };
    }

    if (dayNumber > daysInMonth) {
      return {
        day: dayNumber - daysInMonth,
        outside: true,
        key: `next-${index}`,
      };
    }

    return {
      day: dayNumber,
      outside: false,
      key: `current-${dayNumber}`,
    };
  });

  const moveMonth = (amount) => {
    setMonthDate(new Date(year, month + amount, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  /* Search appointments */

  const normalizedSearch = search.trim().toLowerCase();

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const searchableText = [
        item.doctor,
        item.title,
        item.specialty,
        item.dateISO,
        formatDate(item.dateISO),
        item.time,
        formatTime(item.time),
        item.notes,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [appointments, normalizedSearch]);

  /* Upcoming appointments */

  const upcomingAppointments = useMemo(() => {
    return filteredAppointments
      .filter((item) => item.dateISO >= todayISO)
      .sort((a, b) => {
        const dateComparison = a.dateISO.localeCompare(b.dateISO);

        return dateComparison !== 0
          ? dateComparison
          : a.time.localeCompare(b.time);
      });
  }, [filteredAppointments, todayISO]);

  /* Upcoming period filter */

  const displayedUpcomingAppointments = useMemo(() => {
    const end = new Date();

    if (upcomingPeriod === "Days") {
      end.setDate(end.getDate() + 7);
    } else if (upcomingPeriod === "Months") {
      end.setMonth(end.getMonth() + 3);
    } else {
      end.setFullYear(end.getFullYear() + 1);
    }

    const endISO = getLocalDateISO(end);

    return upcomingAppointments.filter((item) => item.dateISO <= endISO);
  }, [upcomingAppointments, upcomingPeriod]);

  /* Reset form */

  const resetForm = () => {
    setEditingId(null);
    setDoctor("");
    setSpecialty("Consultation");
    setAppointmentDate("");
    setAppointmentTime("09:00");
    setNotes("");
    setFormError("");
  };

  /* New appointment */

  const newBooking = () => {
    resetForm();
    setShowForm(true);
    setActiveTab("booking");

    window.setTimeout(() => {
      document.getElementById("appointment-booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  /* Edit appointment */

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);
    setDoctor(appointment.doctor);
    setSpecialty(appointment.specialty);
    setAppointmentDate(appointment.dateISO);
    setAppointmentTime(appointment.time || "09:00");
    setNotes(appointment.notes || "");
    setFormError("");
    setShowForm(true);
    setActiveTab("booking");

    window.setTimeout(() => {
      document.getElementById("appointment-booking-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  /* Close form */

  const closeForm = () => {
    setShowForm(false);
    resetForm();
    setActiveTab("appointments");
  };

  /* Save or update appointment */

  const handleBooking = (event) => {
    event.preventDefault();
    setFormError("");

    if (!doctor.trim() || !appointmentDate || !appointmentTime) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const [selectedYear, selectedMonth, selectedDay] =
      appointmentDate.split("-").map(Number);

    const dateCheck = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDay
    );

    const validDate =
      dateCheck.getFullYear() === selectedYear &&
      dateCheck.getMonth() === selectedMonth - 1 &&
      dateCheck.getDate() === selectedDay;

    if (!validDate) {
      setFormError("Please select a valid appointment date.");
      return;
    }

    if (editingId === null && appointmentDate < todayISO) {
      setFormError("Please select today or a future date.");
      return;
    }

    const appointmentData = normalizeAppointment({
      id: editingId ?? `appointment-${Date.now()}-${Math.random()}`,
      doctor: doctor.trim(),
      title: doctor.trim(),
      specialty,
      dateISO: appointmentDate,
      time: appointmentTime,
      notes: notes.trim(),
      color: "blue",
    });

    setAppointments((previous) => {
      if (editingId !== null) {
        return previous.map((item) =>
          item.id === editingId ? appointmentData : item
        );
      }

      return [...previous, appointmentData];
    });

    setMonthDate(new Date(selectedYear, selectedMonth - 1, 1));

    closeForm();
  };

  /* Delete appointment */

  const handleDelete = (appointment) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment with ${
        appointment.doctor
      } on ${formatDate(appointment.dateISO)}?`
    );

    if (!confirmed) return;

    setAppointments((previous) =>
      previous.filter((item) => item.id !== appointment.id)
    );

    if (editingId === appointment.id) {
      closeForm();
    }
  };

  return (
    <div className="appointment-app">
      {/* Mobile overlay */}

      {isMobile && sidebarOpen && (
        <button
          type="button"
          className="appointment-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar: desktop collapses to icons; mobile slides in/out */}

      <aside
        className={`appointment-sidebar ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="appointment-brand">
          <div className="appointment-logo">
            <span>M</span>
            <small>HUB</small>
          </div>

          {sidebarOpen && <strong>MyPatientHUB</strong>}
        </div>

        <nav className="appointment-navigation">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebarOnMobile}
              title={!sidebarOpen ? item.label : undefined}
              aria-label={item.label}
              className={`appointment-menu-item ${
                item.label === "Appointments" ? "active" : ""
              }`}
            >
              <span className="appointment-menu-icon">{item.icon}</span>

              {sidebarOpen && (
                <span className="appointment-menu-label">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="appointment-sidebar-help">
            <strong>Need Help?</strong>
            <p>Contact our support team.</p>
          </div>
        )}
      </aside>

      {/* Main content */}

      <main
        className={`appointment-main ${
          !sidebarOpen && !isMobile ? "appointment-main-expanded" : ""
        }`}
      >
        {/* Header */}

        <header className="appointment-header">
          <div className="appointment-heading-left">
            <div className="appointment-breadcrumb">
              <span>⌂</span>
              <span>/</span>
              <span>Appointment</span>
            </div>

            <h2>Appointment</h2>
          </div>

          {/* Hamburger stays visible in both sidebar states */}

          <button
            type="button"
            className="appointment-hamburger"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={sidebarOpen}
          >
            ☰
          </button>

          <div className="appointment-header-actions">
            <label className="appointment-search">
              <span>⌕</span>

              <input
                type="search"
                placeholder="Search appointments..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search appointments"
              />

              {search && (
                <button
                  type="button"
                  className="appointment-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </label>

            <button
              type="button"
              className="appointment-logout"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              ⊙ Log out
            </button>

            <button
              type="button"
              className="appointment-header-icon"
              aria-label="Settings"
              onClick={() => window.alert("Settings")}
            >
              ⚙
            </button>

            <button
              type="button"
              className="appointment-header-icon"
              aria-label="Notifications"
              onClick={() => window.alert("Notifications")}
            >
              ♟
            </button>
          </div>
        </header>

        {/* Tabs */}

        <section className="appointment-tabs">
          <button
            type="button"
            className={activeTab === "appointments" ? "selected" : ""}
            onClick={() => {
              setActiveTab("appointments");
              setShowForm(false);
              resetForm();
            }}
          >
            <span>◉</span>
            Appointments
          </button>

          <button
            type="button"
            className={activeTab === "booking" ? "selected" : ""}
            onClick={newBooking}
          >
            <span>▦</span>
            New Booking
          </button>
        </section>

        {/* Statistics */}

        <section className="appointment-stats">
          <MiniChart title="Procedures Taken" value="30" increase="3" />

          <MiniChart
            title="Treatments Taken"
            value="12"
            increase="1"
            variant={1}
          />

          <button
            type="button"
            className="appointment-new-card"
            onClick={newBooking}
          >
            <span>＋</span>
            <strong>New Appointment</strong>
          </button>
        </section>

        {/* Booking form */}

        {showForm && (
          <section
            className="appointment-booking-panel"
            id="appointment-booking-form"
          >
            <div className="appointment-panel-heading">
              <h3>
                {editingId !== null
                  ? "Edit Appointment"
                  : "Book a New Appointment"}
              </h3>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBooking} className="appointment-booking-form">
              <label>
                Doctor / Appointment *

                <input
                  type="text"
                  value={doctor}
                  onChange={(event) => setDoctor(event.target.value)}
                  placeholder="Enter doctor name"
                  required
                />
              </label>

              <label>
                Specialty *

                <select
                  value={specialty}
                  onChange={(event) => setSpecialty(event.target.value)}
                  required
                >
                  <option value="Consultation">Consultation</option>
                  <option value="General Checkup">General Checkup</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Examination">Examination</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Appointment Date *

                <input
                  type="date"
                  min={editingId === null ? todayISO : undefined}
                  value={appointmentDate}
                  onChange={(event) => setAppointmentDate(event.target.value)}
                  required
                />
              </label>

              <label>
                Appointment Time *

                <input
                  type="time"
                  value={appointmentTime}
                  onChange={(event) => setAppointmentTime(event.target.value)}
                  required
                />
              </label>

              <label className="appointment-notes-field">
                Notes (optional)

                <input
                  type="text"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Reason for visit or additional notes"
                />
              </label>

              {formError && (
                <p className="appointment-form-error" role="alert">
                  {formError}
                </p>
              )}

              <div className="appointment-form-buttons">
                <button type="submit">
                  {editingId !== null ? "Save Changes" : "Save Appointment"}
                </button>

                <button
                  type="button"
                  className="appointment-cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Calendar and right column */}

        <section className="appointment-content-grid">
          {/* Calendar */}

          <div className="appointment-calendar-card">
            <div className="appointment-calendar-heading">
              <h3>
                {monthName} {year}
              </h3>

              <div className="appointment-calendar-controls">
                <button type="button" onClick={goToToday}>
                  today
                </button>

                <button
                  type="button"
                  onClick={() => moveMonth(-1)}
                  aria-label="Previous month"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => moveMonth(1)}
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="appointment-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day) => (
                  <span key={day}>{day}</span>
                )
              )}
            </div>

            <div className="appointment-calendar-grid">
              {calendarDays.map((item) => {
                let dayDate;

                if (item.key.startsWith("previous-")) {
                  dayDate = new Date(year, month - 1, item.day);
                } else if (item.key.startsWith("next-")) {
                  dayDate = new Date(year, month + 1, item.day);
                } else {
                  dayDate = new Date(year, month, item.day);
                }

                const dayISO = getLocalDateISO(dayDate);

                const dayAppointments = item.outside
                  ? []
                  : filteredAppointments.filter(
                      (appointment) => appointment.dateISO === dayISO
                    );

                const isToday = dayISO === todayISO && !item.outside;

                return (
                  <div
                    className={`appointment-calendar-day ${
                      item.outside ? "outside-month" : ""
                    } ${isToday ? "today" : ""}`}
                    key={item.key}
                  >
                    <span className="appointment-day-number">{item.day}</span>

                    {dayAppointments.map((appointment) => (
                      <button
                        type="button"
                        key={appointment.id}
                        className={`appointment-event ${appointment.color}`}
                        title={`${appointment.doctor} — ${
                          appointment.specialty
                        } — ${formatTime(appointment.time)}. Click to edit.`}
                        onClick={() => handleEdit(appointment)}
                      >
                        {appointment.title}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column */}

          <div className="appointment-right-column">
            <AppointmentBars />

            <PreviousAppointments />

            {/* Upcoming appointments */}

            <section className="appointment-side-card appointment-upcoming-card">
              <div className="appointment-upcoming-heading">
                <h3>Upcoming Appointments</h3>

                <span className="appointment-upcoming-count">
                  {displayedUpcomingAppointments.length}
                </span>
              </div>

              <div className="appointment-period-switch">
                {["Days", "Months", "Years"].map((period) => (
                  <button
                    type="button"
                    key={period}
                    className={upcomingPeriod === period ? "active" : ""}
                    onClick={() => setUpcomingPeriod(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>

              <div className="appointment-upcoming-list">
                {displayedUpcomingAppointments.length > 0 ? (
                  displayedUpcomingAppointments.map((appointment) => (
                    <UpcomingAppointmentItem
                      key={appointment.id}
                      appointment={appointment}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div className="appointment-upcoming-empty">
                    <span>▦</span>

                    <strong>
                      {search
                        ? "No matching appointments"
                        : "No upcoming appointments"}
                    </strong>

                    <p>
                      {search
                        ? "Try another doctor name, specialty, date, time, or note."
                        : upcomingAppointments.length > 0
                        ? "Appointments exist, but none are in this selected time range."
                        : "Your future appointments will appear here after you book them."}
                    </p>

                    {search ? (
                      <button type="button" onClick={() => setSearch("")}>
                        Clear Search
                      </button>
                    ) : (
                      <button type="button" onClick={newBooking}>
                        + Book Appointment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Appointment;
