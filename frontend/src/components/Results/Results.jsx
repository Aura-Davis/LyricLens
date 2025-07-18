import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import './results.css'

export default function Results({ data }) {
    if (!data) return null;

    const chartData = Object.entries(data.analysis.emotion_breakdown).map(
        ([key, value]) => ({ name: key, value: value })
    );

    const EMOTION_COLORS = {
        joy: "#FF6384",
        love: "#FF8C00",
        surprise: "#FFCE56",
        anger: "#E91E63",
        sadness: "#36A2EB",
        fear: "#AA00FF",
        neutral: "#9E9E9E",
        optimism: "#4CAF50",
        pessimism: "#795548"
    };

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.50;
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
        <div>
            <h2>Lyrics: </h2>
            <pre>{data.lyrics}</pre>
            <h2>Dominant Emotion: <span className="font-semibold text-purple-600">{data.analysis.emotion}</span></h2>
            {chartData.length > 0 && data.spotify_info?.album_art ? (
                <div className="chart-and-album">
                    <ResponsiveContainer width="50%" height={300}>
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

                    <div className="album-container">
                        <a
                            href={data.spotify_info.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
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
                            className="text-blue-600 underline mt-2 text-sm text-center"
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
                className="text-purple-600 underline block mt-4"
            >
                View Full Lyrics on Genius
            </a>
        </div>

    );
}