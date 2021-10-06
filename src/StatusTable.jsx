export const StatusTable = ({ columns = [], rows = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, j) => (
          <tr key={j}>
            {row.map((cell, k) => (
              <td key={k}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default StatusTable;
