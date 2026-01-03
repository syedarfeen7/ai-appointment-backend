export const timeFromNowInMinutes = (minutes: number) => {
  const now = new Date();
  const future = new Date(now.getTime() + minutes * 60 * 1000);

  const diffMs = future.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

  const readable =
    diffHours > 0
      ? `${diffHours} hour${diffHours > 1 ? "s" : ""}${
          diffMinutes > 0 ? ` ${diffMinutes} min` : ""
        }`
      : `${diffMinutes} min${diffMinutes > 1 ? "s" : ""}`;

  return { date: future, readable };
};
