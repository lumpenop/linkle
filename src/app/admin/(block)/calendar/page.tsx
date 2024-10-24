"use client";

import Layout from "../components/layout";
import CalendarHeader from "./components/calendar-header";
import ScheduleList from "./components/schedule-list";
import StyleSetting from "./components/style-setting";

export default function CalendarPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return false;
  };

  return (
    <Layout title="캘린더 블록" onSubmit={handleSubmit}>
      <CalendarHeader />
      <StyleSetting />
      <ScheduleList />
    </Layout>
  );
}
