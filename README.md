# hostsfile

This is a simple task that adds an entry to the `/etc/hosts` file. The main goal of this task is to illustrate how to use the hostctl tool to create a task that can be run locally or on a remote machine.

## Usage

```
❯ npx hostctl run add_entry.ts names:foo,bar
✔ Enter local sudo password:
=== Evaluation ===
✓ Running add_entry.ts
  ✓ Edit files: ensure lines/blocks present or absent with optional regex matching.
    ✓ Search for a pattern in a file and return presence and count.
    ✓ Search for a pattern in a file and return presence and count.
  ✓ Edit files: ensure lines/blocks present or absent with optional regex matching.
    ✓ Search for a pattern in a file and return presence and count.
    ✓ Search for a pattern in a file and return presence and count.
=== Result ===
Running add_entry.ts completed with result: { success: true }

❯ tail /etc/hosts
127.0.0.1 localhost

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
127.0.0.1	foo
127.0.0.1	bar
```
