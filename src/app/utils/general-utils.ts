export function getDate(dateStr: string): string {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        throw new Error("Fecha inválida: " + dateStr);
    }

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;

}

export function getTime(dateStr: string): string {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        throw new Error("Fecha inválida: " + dateStr);
    }

    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mi}`;
}


export function combineDateAndTime(startDate: Date, endTimeStr: string): Date {
    const [hours, minutes] = endTimeStr.split(":").map(Number);
    const endDate = new Date(startDate);
    endDate.setHours(hours, minutes, 0, 0);
    return endDate;
}

export function getPostgresInterval(startTime: Date, endTime: Date): string {
    const diffMs = endTime.getTime() - startTime.getTime();
    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let interval = "";
    if (hours > 0) interval += `${hours} hour${hours !== 1 ? "s" : ""}`;
    if (minutes > 0)
        interval += (interval ? " " : "") + `${minutes} minute${minutes !== 1 ? "s" : ""}`;

    return interval || "1 hour";
}

export function calculateEndTime(start: string, duration: string): Date {
    const end = new Date(start);
    if (!duration) return end;

    const dur = duration.trim().toLowerCase();

    const regex = /(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*minutes?)?/;
    const match = dur.match(regex);

    const hours = match && match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match && match[2] ? parseInt(match[2], 10) : 0;

    end.setHours(end.getHours() + hours);
    end.setMinutes(end.getMinutes() + minutes);

    return end;
}