import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './results.css';

export default function Results({ data }) {
    if (!data) return null;

    // Map text2emotion emotions to chart format
    const chartData = Object.entries(data.analysis.emotion_breakdown)
        .filter(([_, value]) => value > 0)
        .map(([key, value]) => ({ name: key, value }));

    // text2emotion emotion colors
    const EMOTION_COLORS = {
        happy: "#FFCE56",     // Yellow
        angry: "#E91E63",     // Pink/Red
        surprise: "#FF8C00",  // Orange
        sad: "#36A2EB",       // Blue
        fear: "#AA00FF",      // Purple
    };

    // Label renderer for the pie chart
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${chartData[index].name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    return (
        <div className="results-container">
            <h2>Lyrics:</h2>
            <pre className="lyrics-block">{data.lyrics}</pre>

            <h2>
                Dominant Emotion:
                <span className="dominant-emotion">{data.analysis.emotion}</span>
            </h2>

            {chartData.length > 0 && data.spotify_info?.album_art ? (
                <div className="chart-album-wrapper">
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={renderCustomizedLabel}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={EMOTION_COLORS[entry.name.toLowerCase()] || "#CCCCCC"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="album-container">
                        <a
                            href={data.spotify_info.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={data.spotify_info.album_art}
                                alt="Album Art"
                                className="album-art"
                            />
                        </a>
                        <a
                            href={data.spotify_info.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="spotify-link"
                        >
                            Listen on Spotify
                        </a>
                    </div>
                </div>
            ) : (
                <p>No emotion breakdown or album art available.</p>
            )}

            <a
                href={data.genius_url}
                target="_blank"
                rel="noopener noreferrer"
                className="genius-link"
            >
                View Full Lyrics on Genius
            </a>
        </div>
    );
}
