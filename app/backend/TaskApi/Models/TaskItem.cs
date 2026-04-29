namespace TaskApi.Models;

public class TaskItem
{
	public Guid Id { get; set; } = Guid.NewGuid();
	public required string Title { get; set; }
	public bool IsDone { get; set; }
	public int Priority { get; set; } = 2; // 1=Alta,2=Media,3=Baja
	public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
}