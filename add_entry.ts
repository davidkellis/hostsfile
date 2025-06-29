import { task, type TaskContext, core } from "hostctl";

export interface HostsFileAddEntryParams {
  /**
   * The IP address for the hosts file entry. Defaults to 127.0.0.1.
   */
  ip: string;

  /**
   * The hostname(s) for the hosts file entry. Can be a single string or an array of strings. Defaults to empty list.
   */
  names: string | string[];

  /**
   * An optional comment to add at the end of the line.
   */
  comment?: string;

  /**
   * Whether to run the command with sudo. Defaults to true.
   */
  /** Whether to run commands with sudo. Defaults to false for testability */
  sudo?: boolean;
}

export interface HostsFileAddEntryResult {
  success: boolean;
}

/**
 * Adds an entry to the /etc/hosts file.
 */
async function run(context: TaskContext<HostsFileAddEntryParams>): Promise<HostsFileAddEntryResult> {
  const { params, run } = context;
  const { ip = "127.0.0.1", names = [], comment, sudo = true } = params;

  const hostnameList = Array.isArray(names) ? names : names.split(/\s+/).filter(Boolean);

  for (const hostname of hostnameList) {
    const entry = `${ip}\t${hostname}${comment ? ` # ${comment}` : ""}`;
    const regex = `.*\\b${hostname}\\b.*`;

    const editResult = await run(
      core.file.edit({
        file: "/etc/hosts",
        line: entry,
        regex,
        sudo,
      })
    );

    if (!editResult.success) {
      return { success: false };
    }
  }

  return {
    success: true,
  };
}

export default task(run, {
  name: "hostsfile.add_entry",
  description: "Add an entry to the /etc/hosts file.",
});
