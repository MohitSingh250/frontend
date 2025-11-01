import React, { useMemo } from "react"

const ActivityHeatmap2 = ({submissions})=>{
    const heatmapData = useMemo(()=>{

        const dateMap = {};
        submissions.forEach(sub => {
        if (sub.solvedAt) {
            const date = new Date(sub.solvedAt).toDateString();
            dateMap[date] = (dateMap[date] || 0) + 1;
        }})
        console.log(dateMap)

    },[submissions])

}
export default ActivityHeatmap2
