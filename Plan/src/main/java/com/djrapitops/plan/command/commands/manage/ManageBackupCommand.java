package main.java.com.djrapitops.plan.command.commands.manage;

import com.djrapitops.plugin.command.CommandType;
import com.djrapitops.plugin.command.ISender;
import com.djrapitops.plugin.command.SubCommand;
import com.djrapitops.plugin.task.AbsRunnable;
import com.djrapitops.plugin.utilities.Verify;
import main.java.com.djrapitops.plan.Log;
import main.java.com.djrapitops.plan.Permissions;
import main.java.com.djrapitops.plan.Plan;
import main.java.com.djrapitops.plan.api.exceptions.DatabaseInitException;
import main.java.com.djrapitops.plan.database.Database;
import main.java.com.djrapitops.plan.locale.Locale;
import main.java.com.djrapitops.plan.locale.Msg;
import main.java.com.djrapitops.plan.utilities.Check;
import main.java.com.djrapitops.plan.utilities.ManageUtils;

/**
 * This manage subcommand is used to backup a database to a .db file.
 *
 * @author Rsl1122
 * @since 2.3.0
 */
public class ManageBackupCommand extends SubCommand {

    private final Plan plugin;

    /**
     * Class Constructor.
     *
     * @param plugin Current instance of Plan
     */
    public ManageBackupCommand(Plan plugin) {
        super("backup",
                CommandType.CONSOLE,
                Permissions.MANAGE.getPermission(),
                Locale.get(Msg.CMD_USG_MANAGE_BACKUP).toString(),
                "<DB>");

        this.plugin = plugin;
    }

    @Override
    public boolean onCommand(ISender sender, String commandLabel, String[] args) {
        try {
            if (!Check.isTrue(args.length >= 1, Locale.get(Msg.CMD_FAIL_REQ_ARGS).parse(this.getArguments()), sender)) {
                return true;
            }
            String dbName = args[0].toLowerCase();
            boolean isCorrectDB = "sqlite".equals(dbName) || "mysql".equals(dbName);
            if (Check.isTrue(isCorrectDB, Locale.get(Msg.MANAGE_FAIL_INCORRECT_DB) + dbName, sender)) {
                return true;
            }

            final Database database = ManageUtils.getDB(plugin, dbName);

            // If DB is null return
            if (!Check.isTrue(Verify.notNull(database), Locale.get(Msg.MANAGE_FAIL_FAULTY_DB).toString(), sender)) {
                Log.error(dbName + " was null!");
                return true;
            }

            runBackupTask(sender, args, database);
        } catch (DatabaseInitException | NullPointerException e) {
            sender.sendMessage(Locale.get(Msg.MANAGE_FAIL_FAULTY_DB).toString());
        }
        return true;
    }

    private void runBackupTask(ISender sender, String[] args, final Database database) {
        plugin.getRunnableFactory().createNew(new AbsRunnable("BackupTask") {
            @Override
            public void run() {
                try {
                    sender.sendMessage(Locale.get(Msg.MANAGE_INFO_START).parse());
                    if (ManageUtils.backup(args[0], database)) {
                        sender.sendMessage(Locale.get(Msg.MANAGE_INFO_COPY_SUCCESS).toString());
                    } else {
                        sender.sendMessage(Locale.get(Msg.MANAGE_INFO_FAIL).toString());
                    }
                } catch (Exception e) {
                    Log.toLog(this.getClass().getName() + " " + getTaskName(), e);
                    sender.sendMessage(Locale.get(Msg.MANAGE_INFO_FAIL).toString());
                } finally {
                    this.cancel();
                }
            }
        }).runTaskAsynchronously();
    }
}
